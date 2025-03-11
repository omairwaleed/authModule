"use client";
import axiosClient from "@/utils/axios";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
export default function Home() {
  const [user, setUser] = useState<{ email: string; name: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const fetchUser = async () => {
    try {
      const res = await axiosClient.get("/user");
      setUser(res.data.user);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          `getting user failed: ${
            error.response?.data?.message || error.message
          }`
        );
      } else if (error instanceof Error) {
        toast.error(`getting user failed: ${error.message}`);
      } else {
        toast.error("getting user failed: An unknown error occurred");
      }
    }
  };
  const logOut = async () => {
    try {
      setIsLoading(true);
      await axiosClient.get("/auth/logout");
      router.push("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          `log out failed: ${error.response?.data?.message || error.message}`
        );
      } else if (error instanceof Error) {
        toast.error(`log out failed: ${error.message}`);
      } else {
        toast.error("log out failed: An unknown error occurred");
      }
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      {user ? (
        <div className=" w-full flex flex-col  items-center p-7">
          <ToastContainer />
          <button
            className={`rounded-2xl self-end ${
              isLoading ? "bg-gray-400" : "bg-black"
            } bg-black text-white  px-2 py-2 mb-4 text-2xl font-medium cursor-pointer `}
            onClick={logOut}
          >
            Log out
          </button>
          <p className="font-bold text-2xl mb-5">Welcome to the application</p>
          <p className="text-gray-700">Email : {user.email}</p>
          <p className="text-gray-700">Name : {user.name}</p>
        </div>
      ) : (
        <div className=" w-full flex flex-col  items-center p-7">
          <p> Loading ....</p>
        </div>
      )}
    </>
  );
}
