"use client";
import CustomInput from "@/components/customInput";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { formInputEnum } from "../../enums/formInputEnum";
import CustomButton from "@/components/customButton";
import Image from "next/image";
import axiosClient from "@/utils/axios";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";
const Page = () => {
  const { handleSubmit, control } = useForm({
    defaultValues: { password: "", email: "" },
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const submitHandler = async ({
    password,
    email,
  }: {
    password: string;
    email: string;
  }) => {
    try {
      setIsLoading(true);
      await axiosClient.post("/auth/signin", {
        email,
        password,
      });
      // router.push("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data?.message || error.message);
        toast.error(
          `Login failed: ${error.response?.data?.message || error.message}`
        );
      } else if (error instanceof Error) {
        toast.error(`Login failed: ${error.message}`);
      } else {
        toast.error("Login failed: An unknown error occurred");
      }
    }
    setIsLoading(false);
  };
  return (
    <div className="h-screen w-full flex flex-row">
      <ToastContainer />
      <div className="hidden md:flex h-full w-1/2 bg-gradient-to-b from-gray-50 to-gray-700  flex-col  items-center justify-evenly">
        <Image
          className="w-1/2 h-1/2"
          width={10}
          height={10}
          src={"assets/logo.svg"}
          alt=""
        />
      </div>
      <div className="h-full w-full md:w-1/2 p-24 flex flex-col justify-center">
        <p className="text-4xl text-black font-semibold mb-5">Sign In</p>
        <form onSubmit={handleSubmit(submitHandler)}>
          <CustomInput
            control={control}
            name="email"
            type="text"
            title={formInputEnum.EMAIL.inputTitle}
            rules={formInputEnum.EMAIL.rules}
          />
          <CustomInput
            control={control}
            name="password"
            type="password"
            title={formInputEnum.PASSWORD.inputTitle}
            rules={formInputEnum.PASSWORD.rules}
          />
          <CustomButton title="sign in" isLoading={isLoading} />
        </form>
        <Link
          href="/signup"
          className=" mt-4 text-lg text-blue-800 cursor-pointer font-semibold mb-5"
        >
          New User ? SIGN UP
        </Link>
      </div>
    </div>
  );
};

export default Page;
