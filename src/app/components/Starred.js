"use client"

import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { ToastContext } from "../context/ToastContext";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { app } from "../config/firbaseConfig";
import FileList from "./FileList";
import SearchBar from "./SeachBar";

const Starred  = ()=>{
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
          where("isStared", "==", true)
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

export default Starred;