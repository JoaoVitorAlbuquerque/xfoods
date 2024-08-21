import { CrossCircledIcon } from '@radix-ui/react-icons';
import { NumericFormat } from 'react-number-format';

interface InputCurrencyProps {
  error?: string;
  value?: string | number;
  onChange?(value: string): void;
}

export function InputCurrency({ error, value, onChange }: InputCurrencyProps) {
  return (
    <div>
      <NumericFormat
        thousandSeparator=","
        decimalSeparator="."
        value={value}
        onChange={event => onChange?.(event.target.value)}
        className="text-gray-800 text-[32px] font-bold tracking-[-1px] outline-none w-full"
      />

        {error && (
          <div className="flex gap-2 items-center mt-2 text-red-900">
            <CrossCircledIcon />

            <span className="text-xs">{error}</span>
          </div>
        )}
    </div>
  );
}
