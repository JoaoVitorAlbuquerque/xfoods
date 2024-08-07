import { ComponentProps } from "react";
import { twMerge } from 'tailwind-merge';

interface TableCellProps extends ComponentProps<'td'> {}

export function TableCell(props: TableCellProps) {
  return (
    <td {...props} className={twMerge("p-4 text-sm font-normal text-gray-500", props.className)} />
  );
}
