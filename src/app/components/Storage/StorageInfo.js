"use client";

import { app } from "@/app/config/firbaseConfig";
import { ToastContext } from "@/app/context/ToastContext";
import { collection, getFirestore, query, where, getDocs } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";

const StorageInfo = () => {
  const db = getFirestore(app);
  const { data: session, status } = useSession();
  const { toastMessage, setToastMessage } = useContext(ToastContext);
  const [totalUsed, setTotalUsed] = useState(0);
  const [totalFiles, setTotalFiles] = useState(0);
  const maxStorage = 50 * 1024 * 1024;

  const getAllFiles = async () => {
    if (!session || status !== "authenticated") return;

    try {
      const q = query(collection(db, "File"), where("email", "==", session.user.email));
      const querySnapshot = await getDocs(q);

      let totalSize = 0;
      querySnapshot.forEach((doc) => {
        const fileSize = doc.data()["size"] || 0;
        totalSize += fileSize;
      });

      setTotalUsed(totalSize);
      setTotalFiles(querySnapshot.size); 
    } catch (error) {
      console.error("Error fetching files: ", error);
      setToastMessage("Error fetching storage info");
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      getAllFiles();
    }
  }, [status, toastMessage]);

  const percentageUsed = (totalUsed / maxStorage) * 100;
  const remainingStorage = ((maxStorage - totalUsed) / (1024 * 1024)).toFixed(2); // Remaining storage in MB

  return (
    <div className="mt-10 p-6 bg-white shadow-lg rounded-lg max-w-lg mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Storage Info</h2>
          <p className="text-sm text-gray-500">Manage your cloud storage usage efficiently.</p>
        </div>
      </div>

      <div className="mb-4 flex justify-between items-center">
        <span className="font-bold text-2xl text-gray-800">{(totalUsed / (1024 * 1024)).toFixed(2)} MB</span>
        <span className="text-sm text-gray-500">used of</span>
        <span className="font-bold text-2xl text-gray-800">50 MB</span>
      </div>
      
      <div className="w-full bg-gray-300 h-6 rounded-full overflow-hidden mb-2">
        <div
          className={`bg-gradient-to-r from-green-400 to-green-600 h-full transition-all duration-300 ease-out`}
          style={{ width: `${Math.min(percentageUsed, 100)}%` }}
        ></div>
      </div>
      <div className="text-right text-sm text-gray-500 mb-4">{percentageUsed.toFixed(2)}% used</div>

      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-lg text-blue-600">{remainingStorage} MB</h3>
          <p className="text-sm text-gray-600">Remaining Storage</p>
        </div>
        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-lg text-blue-600">{totalFiles}</h3>
          <p className="text-sm text-gray-600">Total Files</p>
        </div>
      </div>

    </div>
  );
};

export default StorageInfo;
