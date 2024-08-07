import { ComponentProps } from "react";

interface TableHeaderProps extends ComponentProps<'th'> {}

export function TableHeader(props: TableHeaderProps) {
  return (
    <th className="p-4 text-sm text-gray-500/90 font-bold text-left" {...props} />
  );
}
