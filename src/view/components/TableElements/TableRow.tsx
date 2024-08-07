import { ComponentProps } from "react";

interface TableRowProps extends ComponentProps<'tr'> {}

export function TableRow(props: TableRowProps) {
  return (
    <tr className="border-b border-gray-600/40 bg-white" {...props} />
  );
}
