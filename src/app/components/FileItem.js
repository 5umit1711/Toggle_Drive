import { doc, getFirestore, updateDoc } from "firebase/firestore";
import Image from "next/image";
import { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { app } from "../config/firbaseConfig";

const FileItem = ({ file, onDelete }) => {
  const [isStarred, setIsStarred] = useState(file.isStared || false);
  const db = getFirestore(app);

  const toggleStarred = async () => {
    try {
      const fileRef = doc(db, "File", file.id.toString());
      const newStarred = !isStarred;
      updateDoc(fileRef, { isStared: newStarred });
      setIsStarred(newStarred);
    } catch (error) {
      console.log("Error in starred");
    }
  };

  return (
    <div className="grid grid-cols-4 md:grid-cols-6 text-[13px] font-semibold border-b-[1px] pb-2 mt-3 border-gray-300 text-gray-700">
      <div className="flex gap-1 col-span-2">
        <Image
          src="/fileIcon.png"
          width={20}
          height={10}
          alt="file"
          className="w-auto"
        />
        <h2 className="cursor-pointer" onClick={() => window.open(file.url)}>
          {file.name}
        </h2>
      </div>

      <h2>{file.modifiedAt}</h2>

      <h2>{(file.size / 1024 ** 2).toFixed(2) + " MB"}</h2>

      <button
        className="text-yellow-500 hover:text-yellow-700 transition-colors ml-3"
        onClick={toggleStarred}
      >
        {isStarred ? <FaStar /> : <FaRegStar />}
      </button>

      <button
        className="text-red-500 hover:text-red-700 transition-colors"
        onClick={() => onDelete(file)}
      >
        Delete
      </button>
    </div>
  );
};

export default FileItem;
