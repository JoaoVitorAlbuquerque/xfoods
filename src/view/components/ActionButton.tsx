import { ComponentProps } from "react";

interface ButtonProps extends ComponentProps<'button'> {}

export function ActionButton(props: ButtonProps) {
  return (
    <button
      {...props}
      className="p-1"
    />
  );
}
