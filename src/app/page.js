"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import SearchBar from "./components/SeachBar";
import FolderList from "./components/FolderList";
import FileList from "./components/FileList";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "./config/firbaseConfig";
import ParentFolderIdContext from "./context/FolderIdContext";
import { ToastContext } from "./context/ToastContext";

export default function Home() {
  const { data: session, status } = useSession();
  const { parentFolderId, setParentFolderId } = useContext(ParentFolderIdContext);
  const { toastMessage, setToastMessage } = useContext(ToastContext);

  const router = useRouter();
  const [folderList, setFolderList] = useState([]);
  const [fileList, setFileList] = useState([]);
  const db = getFirestore(app);

  const getFiles = async () => {
    setFileList([]);
    if (!session?.user?.email) return;
    const q = query(
      collection(db, "File"),
      where("email", "==", session.user.email),
      where("parentFolderId", "==", 0)
    );
    const querySnapShot = await getDocs(q);

    setFileList(
      querySnapShot.docs.map((doc) => doc.data())
    );
  };

  const getFolders = async () => {
    if (!session?.user?.email) return;
    const q = query(
      collection(db, "Folders"),
      where("email", "==", session.user.email),
      where("parentFolderId", "==", 0)
    );
    const querySnapShot = await getDocs(q);

    setFolderList(
      querySnapShot.docs.map((doc) => doc.data())
    );
  };

  useEffect(() => {
    if (status === "loading") {
      return;
    }
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      setParentFolderId(0);
      getFolders(); 
    }
  }, [status, toastMessage]);

  useEffect(() => {
    if (status === "authenticated") {
      getFiles();
    }
  }, [parentFolderId, status, toastMessage]); 

  return (
    <div className="">
      <SearchBar />
      <FolderList folderList={folderList} />
      <FileList fileList={fileList} />
    </div>
  );
}
