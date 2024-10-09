import FolderItem from "./FolderItem";
import { useRouter } from "next/navigation";
import { app } from "../config/firbaseConfig";
import { deleteDoc, doc, getDocs, collection, query, where, getFirestore } from "firebase/firestore";
import { useContext } from "react";
import { ToastContext } from "../context/ToastContext";

const FolderList = ({ folderList }) => {
  const router = useRouter();
  const db = getFirestore(app); 
  const { toastMessage, setToastMessage } = useContext(ToastContext);

  const onFolderClick = (item) => {
    router.push(`/folder/${item.id}?name=${item.name}`);
  };

  const onDelete = async (folder) => {
    const deleteFolderAndChildren = async (folderId) => {
      const childFoldersQuery = query(
        collection(db, "Folders"),
        where("parentFolderId", "==", folderId)
      );

      const childFoldersSnapshot = await getDocs(childFoldersQuery);

      for (const childDoc of childFoldersSnapshot.docs) {
        await deleteFolderAndChildren(childDoc.id); 
        await deleteDoc(doc(db, "Folders", childDoc.id)); 
      }
    };

    await deleteFolderAndChildren(folder.id.toString());
    await deleteDoc(doc(db, "Folders", folder.id.toString()));
    setToastMessage("Folder deleted successfully");
  };

  return (
    <div className="p-4 mt-4 bg-white">
      <h2 className="text-1xl font-bold">
        Recent Folders
        <span className="float-right text-purple-600 cursor-pointer">View All</span>
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {folderList.map((item) => (
          <div key={item.id} onClick={() => onFolderClick(item)}>
            <FolderItem folder={item} onDelete={onDelete} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FolderList;
