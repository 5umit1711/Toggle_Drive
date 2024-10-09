import FileItem from "./FileItem";
import { app } from "@/app/config/firbaseConfig";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import { useContext } from "react";
import { ToastContext } from "../context/ToastContext";
import { deleteObject, getStorage, ref } from "firebase/storage";

const FileList = ({ fileList }) => {
  const db = getFirestore(app);
  const storage = getStorage(app);
  const { toastMessage, setToastMessage } = useContext(ToastContext);

  const onDelete = async (file) => {
    const fileRef = ref(storage, "file/" + file.name);
    await deleteDoc(doc(db, "File", file.id.toString()));
    deleteObject(fileRef)
      .then(() => {
        setToastMessage("File Deleted!!");
      })
      .catch((error) => console.log("Error in deleting file from storage"));
  };

  return (
    <div className="bg-white mt-5 p-5 rounded-lg">
      <h2 className="text-[18px] font-bold">Files</h2>

      <div
        className="grid grid-cols-4 md:grid-cols-6 text-[13px] font-semibold 
    border-b-[1px] pb-2 mt-3 border-gray-300 text-gray-400"
      >
        <h2 className="col-span-2">Name</h2>
        <h2>Modified</h2>
        <h2>Size</h2>
        <h2>Starred</h2>
        <h2></h2>
      </div>

      {fileList &&
        fileList.map((item, index) => (
          <FileItem key={index} file={item} onDelete={onDelete} />
        ))}
    </div>
  );
};

export default FileList;
