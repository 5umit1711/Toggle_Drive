"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import CreateFolderModal from "./CreateFolderModal";
import UploadFileModal from "./UploadFileModal";
import { useSession } from "next-auth/react";

const SideNavBar = ({activeState, setActiveState}) => {
  const [folderDialog, setFolderDialog] = useState(true);
  const {data: session, status} = useSession();

  const dialogFolder = useRef(null);
  const dialogFile = useRef(null);

  const closeModal = ()=>{
    dialogFolder.current.close();
    dialogFile.current.close();
  }

  if(status !== "authenticated"){
    return <div className="w-60">
    </div>
  }

  return (
    <div className="w-[280px] bg-slate-300 shadow-blue-300 shadow-md h-screen sticky top-0 z-10">
      <div className="bg-slate-300 flex justify-center">
        <Image src="/uploadIcon.png" width={80} height={30} alt="Icon" />
      </div>
      <h2 className="text-center text-lg font-semibold">Toggle Drive</h2>
      <div className="flex flex-col gap-2 mt-3 px-4">
        <button className="flex items-center gap-1 justify-between bg-blue-400 text-white px-2 py-2 rounded-lg w-full hover:scale-105"
        onClick={() => document.getElementById("upload_file_modal").showModal()}
        >
          Add new File
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button
          className="flex items-center gap-1 justify-between bg-blue-400 text-white px-2 py-2 rounded-lg w-full hover:scale-105"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          Create new Folder
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div className="flex flex-col gap-6 mt-6">
        <div
          className={`pl-6 flex gap-2 cursor-pointer ${
            activeState === 1 ? "bg-blue-400" : null
          } rounded-lg w-full`}
          onClick={() => setActiveState(1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
          <h2>Home</h2>
        </div>
        <div
          className={`pl-6 flex gap-2 cursor-pointer ${
            activeState === 2 ? "bg-blue-400" : null
          } rounded-lg w-full`}
          onClick={() => setActiveState(2)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
            />
          </svg>
          <h2>My Files</h2>
        </div>
        <div
          className={`pl-6 flex gap-2 cursor-pointer ${
            activeState === 3 ? "bg-blue-400" : null
          } rounded-lg w-full`}
          onClick={() => setActiveState(3)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
            />
          </svg>
          <h2>Starred</h2>
        </div>
      </div>

      <dialog ref={dialogFolder} id="my_modal_3" className="modal">
        <CreateFolderModal closeModal={closeModal} />
      </dialog>
      <dialog ref={dialogFile} id="upload_file_modal" className="modal">
        <UploadFileModal closeModal={closeModal} />
      </dialog>

    </div>
  );
};

export default SideNavBar;
