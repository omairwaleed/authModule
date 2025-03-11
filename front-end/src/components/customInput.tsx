import React from "react";
import {
  Control,
  Controller,
  RegisterOptions,
  FieldValues,
  Path,
} from "react-hook-form";

type Props<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  title: string;
  type: string;
  control: Control<TFieldValues>;
  rules: RegisterOptions<TFieldValues>;
};
const CustomInput = <TFieldValues extends FieldValues>({
  control,
  name,
  title,
  rules,
  type,
}: Props<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <>
          <label className="text-gray-700">{title}</label>
          {error && <p className="text-red-600">{error.message}</p>}
          <input
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            type={type}
            className={`bg-white text-black w-full rounded-md p-2.5 outline-0 border border-[#66666659] mb-8 mt-3.5`}
          />
        </>
      )}
    />
  );
};

export default CustomInput;
