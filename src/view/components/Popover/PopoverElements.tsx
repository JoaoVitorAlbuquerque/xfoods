import * as RdxPopover from '@radix-ui/react-popover';

export function PopoverRoot({ children }: { children: React.ReactNode }) {
  return (
    <RdxPopover.Root>
      {children}
    </RdxPopover.Root>
  );
}

export function PopoverTrigger({ children }: { children: React.ReactNode }) {
  return (
    <RdxPopover.Trigger asChild>
      {children}
    </RdxPopover.Trigger>
  );
}

interface PopoverContentProps {
  children: React.ReactNode;
  className?: string;
}

export function PopoverContent({ children }: PopoverContentProps) {
  return (
    <RdxPopover.Portal>
      <RdxPopover.Content
        className="rounded-2xl p-4 bg-white space-y-2 shadow-sm z-[99]"
      >
        {children}
      </RdxPopover.Content>
    </RdxPopover.Portal>
  );
}
