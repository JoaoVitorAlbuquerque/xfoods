interface ContentHeaderProps {
  title: string;
  quantity: number;
  children?: React.ReactNode;
}

export function ContentHeader({ title, quantity, children }: ContentHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="space-x-2">
        <strong className="text-lg text-gray-500 font-semibold">
          {title}
        </strong>
        <span className="bg-gray-500/20 py-1 px-2 rounded text-gray-500">
          {quantity}
        </span>
      </div>

      {children}
    </div>
  );
}
