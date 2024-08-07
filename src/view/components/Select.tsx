import { ComponentProps } from "react";

interface SelectProps extends ComponentProps<'select'> {}

export function Select(props: SelectProps) {
  return (
    <select
      {...props}
      className="bg-white w-full rounded-lg border border-gray-600 px-3 h-[52px] text-gray-800 focus:border-gray-800 transition-all outline-none"
    >
      {props.children}
    </select>
  );
}
