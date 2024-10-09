"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { FiLogOut } from "react-icons/fi";

const UserInfo = () => {
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md max-w-sm">
          <Image
            src={session.user.image}
            alt="User image"
            width={50}
            height={50}
            className="rounded-full border border-gray-300"
          />

          <div className="flex flex-col flex-grow">
            <h2 className="text-lg font-semibold text-gray-800">
              {session.user.name}
            </h2>
            <div className="flex items-center gap-2">
              <h2 className="text-sm text-gray-500">{session.user.email}</h2>

              <button
                onClick={() => signOut({
                    redirect: "/login"
                })}
                className="ml-auto p-2 rounded-full hover:bg-gray-100 transition-colors"
                title="Logout"
              >
                <FiLogOut className="text-gray-600 hover:text-red-500 transition-colors" size={20} />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserInfo;
