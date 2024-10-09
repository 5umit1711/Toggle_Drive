"use client"

import { useSession } from "next-auth/react";
import StorageInfo from "./StorageInfo";
import UserInfo from "./UserInfo";

const Storage = ()=>{
    const {data: session, status} = useSession();

    if(status !== "authenticated"){
        return <div className="w-44">
        </div>
      }

    return <div>
        <UserInfo />
        <StorageInfo />
    </div>
}

export default Storage;