import { InfoCircledIcon } from "@radix-ui/react-icons";
import { ComponentProps } from "react";

interface SelectProps extends ComponentProps<'select'> {
  error?: string;
}

export function Select({error, ...props}: SelectProps) {
  return (
    <div className="relative">
      <select
        {...props}
        className="bg-white w-full rounded-lg border border-gray-600 px-3 h-[52px] text-gray-800 focus:border-gray-800 transition-all outline-none"
      >
        {props.children}
      </select>

      {error && (
        <div className="flex items-center gap-2 mt-2 text-red-900">
          <InfoCircledIcon />
          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  );
}
