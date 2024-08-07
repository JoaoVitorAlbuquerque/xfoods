import { ComponentProps } from "react";
import { cn } from "../../app/utils/cn";
import { Spinner } from "./Spinner";

interface ButtonProps extends ComponentProps<'button'> {
  isLoading?: boolean;
}

export function Button({className, isLoading, disabled, children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={cn(
        'bg-red-800 border hover:bg-red-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed px-7 h-12 flex items-center justify-center rounded-[44px] text-white font-semibold transition-all',
        className,
      )}
    >
      {!isLoading && children}
      {isLoading && <Spinner className="size-6" />}
    </button>
  );
}
