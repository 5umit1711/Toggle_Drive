"use client"

import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { app } from "../config/firbaseConfig";
import { useSession } from "next-auth/react";
import FileList from "./FileList";
import { ToastContext } from "../context/ToastContext";
import SearchBar from "./SeachBar";

const MyFiles = ()=>{
    const [fileList, setFileList] = useState([]);

    const {data: session, status} = useSession();
    const { toastMessage, setToastMessage } = useContext(ToastContext);

    const db = getFirestore(app)

    const getFiles = async () => {
        setFileList([]);
        if (!session?.user?.email) return;
        const q = query(
          collection(db, "File"),
          where("email", "==", session.user.email),
        );
        const querySnapShot = await getDocs(q);
    
        setFileList(
          querySnapShot.docs.map((doc) => doc.data())
        );
    };

    useEffect(() => {
        if (status === "authenticated") {
          getFiles();
        }
      }, [status, toastMessage]); 

    return <div>
        <SearchBar />
        <FileList fileList={fileList}/>
    </div>
}

export default MyFiles;