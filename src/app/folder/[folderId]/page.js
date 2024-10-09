"use client";
import FileList from "@/app/components/FileList";
import FolderList from "@/app/components/FolderList";
import SearchBar from "@/app/components/SeachBar";
import { app } from "@/app/config/firbaseConfig";
import ParentFolderIdContext from "@/app/context/FolderIdContext";
import { ToastContext } from "@/app/context/ToastContext";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const FolderDetails = ({ params }) => {
  const searchParams = useSearchParams();
  const folderName = searchParams.get("name");
  const { folderId } = params;
  const { toastMessage, setToastMessage } = useContext(ToastContext);
  const { parentFolderId, setParentFolderId } = useContext(
    ParentFolderIdContext
  );
  const { data: session } = useSession();
  const db = getFirestore(app);
  const [folderList, setFolderList] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getFiles = async () => {
    setLoading(true);
    setFileList([]);
    if (!session?.user?.email) return;

    const q = query(
      collection(db, "File"),
      where("email", "==", session.user.email),
      where("parentFolderId", "==", parentFolderId)
    );
    const querySnapShot = await getDocs(q);

    setFileList(querySnapShot.docs.map((doc) => doc.data()));
    setLoading(false);
  };

  const getFolders = async () => {
    if (!session?.user?.email || !parentFolderId) return;

    setLoading(true);
    try {
      const q = query(
        collection(db, "Folders"),
        where("email", "==", session.user.email),
        where("parentFolderId", "==", parentFolderId)
      );
      const querySnapshot = await getDocs(q);
      const folders = querySnapshot.docs.map((doc) => doc.data());

      setFolderList(folders);
    } catch (error) {
      setToastMessage("Failed to fetch folders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setParentFolderId(folderId);
    if (session && parentFolderId) {
      getFolders();
      getFiles();
    }
  }, [session, parentFolderId, toastMessage]);

  return (
    <div className="p-5">
      <SearchBar />
      <h2 className="mt-3 font-bold text-2xl">{folderName}</h2>

      {loading ? (
        <p className="mt-4">Loading folders...</p>
      ) : (
        <FolderList folderList={folderList} />
      )}

      {loading ? (
        <p className="mt-4">Loading files...</p>
      ) : (
        <FileList fileList={fileList} />
      )}
    </div>
  );
};

export default FolderDetails;
