"use client";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Login = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  const handleSignIn = async () => {
    await signIn("google");
  };

  return (
    <div className="ml-28 flex justify-center items-center min-h-screen bg-green-100">
      <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
        <Image src="/uploadIcon.png" width={80} height={30} alt="Icon" className="mb-4" />
        <h1 className="text-lg font-semibold text-gray-800 mb-4">Login to Your Account</h1>
        <button
          onClick={handleSignIn}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="16"
            height="16"
          >
            <path
              fill="#FFFFFF"
              d="M44.5 20H24v8.5h11.8C34.4 34 30 37.5 24 37.5c-7 0-12.8-5.8-12.8-12.8S17 12 24 12c3.2 0 6 1.2 8.2 3.2l6-6C34.8 5.6 29.8 3.5 24 3.5 12.8 3.5 3.5 12.8 3.5 24S12.8 44.5 24 44.5c11.5 0 19.8-9.6 19.8-19.8 0-1.4-.2-2.7-.4-4.2z"
            />
            <path
              fill="#FFFFFF"
              d="M11.2 29.4l-1.5 5.6L6 35.5c-4.5-3.7-7.3-9.4-7.3-15.5s2.8-11.8 7.3-15.5l3.6 2.8 1.5 5.6c-.5 1.2-.8 2.5-.8 3.9s.3 2.6.8 3.9z"
            />
            <path
              fill="#FFFFFF"
              d="M11.2 14.6l-1.5-5.6L6 8.5c2.3-2.5 5.3-4.4 8.7-5.3l3.7 2.9L16.5 11c-1 .5-1.8 1.2-2.5 1.9-1.2 1.3-2 2.9-2.8 4.7z"
            />
            <path
              fill="#FFFFFF"
              d="M44.5 20H24v8.5h11.8C34.4 34 30 37.5 24 37.5c-3.2 0-6-1.2-8.2-3.2l-6 6c3.8 3.7 9 6 14.2 6 11.5 0 19.8-9.6 19.8-19.8 0-1.4-.2-2.7-.4-4.2z"
            />
          </svg>
          <span className="text-sm">Login with Google</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
