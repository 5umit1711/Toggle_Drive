"use client";

import Image from "next/image";
import { useContext, useState } from "react";
import {app} from "../config/firbaseConfig";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { ToastContext } from "../context/ToastContext";
import { useSession } from "next-auth/react";
import ParentFolderIdContext from "../context/FolderIdContext";

const CreateFolder = ({closeModal}) => {
  const {data} = useSession();
  const [folderName, setFolderName] = useState("");
  const {toastMessage, setToastMessage} = useContext(ToastContext);
  const {parentFolderId, setParentFolderId} = useContext(ParentFolderIdContext);

  const db = getFirestore(app);
  const docId = Date.now().toString();

  const onCreate = async () => {
    await setDoc(doc(db, "Folders", docId), {
      name: folderName,
      id: docId,
      email: data.user.email,
      parentFolderId: parentFolderId,
    });
    setFolderName("");
    setToastMessage("Folder Created Successfully");
    closeModal();
  };

  return (
    <div className="modal-box" id="my-modal">
      <form method="dialog">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form>
      <div className="flex flex-col w-full items-center justify-center gap-3">
        <Image src="/folder.jpg" width={70} height={40} alt="folder" />
        <input
          type="text"
          value={folderName}
          placeholder="Folder Name"
          className="p-2 border-[1px] outline-none rounded-lg"
          onChange={(e) => setFolderName(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white w-1/2 rounded-xl p-2 px-2"
          onClick={() => onCreate()}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateFolder;
