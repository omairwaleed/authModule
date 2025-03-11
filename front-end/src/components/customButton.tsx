import React from "react";

type Props = {
  isLoading: boolean;
  title: string;
};
const CustomButton = ({ isLoading, title }: Props) => {
  return (
    <button
      disabled={isLoading}
      type="submit"
      className={`rounded-2xl ${
        isLoading ? "bg-gray-400" : "bg-black"
      } bg-black text-white  px-4 py-4 text-2xl font-medium cursor-pointer `}
    >
      {title}
    </button>
  );
};

export default CustomButton;
