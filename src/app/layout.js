"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider, useSession } from "next-auth/react";
import SideNavBar from "./components/SideNavBar";
import Toast from "./components/Toast";
import { ToastContext } from "./context/ToastContext";
import { useState } from "react";
import ParentFolderIdContext from "./context/FolderIdContext";
import Storage from "./components/Storage/Storage";
import MyFiles from "./components/MyFiles";
import Starred from "./components/Starred";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [toastMessage, setToastMessage] = useState("");
  const [parentFolderId, setParentFolderId] = useState(0);

  const [activeState, setActiveState] = useState(1);

  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContext.Provider value={{ toastMessage, setToastMessage }}>
          <div className="flex">
            <ParentFolderIdContext.Provider
              value={{ parentFolderId, setParentFolderId }}
            >
              <SessionProvider>
                <SideNavBar activeState={activeState} setActiveState={setActiveState}/>
                <div className="grid grid-cols-1 md:grid-cols-3 w-full">
                  <div className="col-span-2 bg-green-100 p-5">
                    {activeState===1 ? children: null}
                    {activeState===2 ? <MyFiles/>: null}
                    {activeState===3? <Starred/>: null}
                    </div>
                  <div className="bg-white p-5">
                    <Storage/>
                  </div>
                </div>
              </SessionProvider>
            </ParentFolderIdContext.Provider>
          </div>
          {toastMessage ? <Toast msg={toastMessage} /> : null}
        </ToastContext.Provider>
      </body>
    </html>
  );
}
