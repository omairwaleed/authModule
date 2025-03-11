"use client";
import CustomButton from "@/components/customButton";
import CustomInput from "@/components/customInput";
import { formInputEnum } from "@/enums/formInputEnum";
import axiosClient from "@/utils/axios";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

const Page = () => {
  const { handleSubmit, control } = useForm({
    defaultValues: { password: "", email: "", name: "" },
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const submitHandler = async ({
    password,
    email,
    name,
  }: {
    password: string;
    email: string;
    name: string;
  }) => {
    try {
      setIsLoading(true);
      await axiosClient.post("/auth/signup", {
        email,
        password,
        name,
      });
      router.push("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data?.message || error.message);
        toast.error(
          `Sign up failed: ${error.response?.data?.message || error.message}`
        );
      } else if (error instanceof Error) {
        toast.error(`Sign up failed: ${error.message}`);
      } else {
        toast.error("Sign up: An unknown error occurred");
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
        <p className="text-4xl text-black font-semibold mb-5">Sign UP</p>
        <form onSubmit={handleSubmit(submitHandler)}>
          <CustomInput
            control={control}
            name="name"
            type="text"
            title={formInputEnum.NAME.inputTitle}
            rules={formInputEnum.NAME.rules}
          />
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
          <CustomButton title="sign up" isLoading={isLoading} />
        </form>
        <Link
          href="/login"
          className=" mt-4 text-lg text-blue-800 cursor-pointer font-semibold mb-5"
        >
          Already have an account ? SIGN IN
        </Link>
      </div>
    </div>
  );
};

export default Page;
