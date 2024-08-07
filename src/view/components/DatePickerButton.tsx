import filterIcon from '../components/icons/filter-icon.svg';
import { DatePicker } from './DatePicker';
import { Popover } from './Popover';

interface DatePickerProps {
  error?: string;
  selectedDate: Date;
  setSelectDate(date: Date): void;
}

export function DatePickerButton({ error, selectedDate, setSelectDate }: DatePickerProps) {

  return (
    <div>
      <Popover.Root>
        <Popover.Trigger>
          <button type="button" className="flex items-center gap-2 size-full">
            <span>Data</span>
            <img src={filterIcon} />
          </button>
        </Popover.Trigger>

        <Popover.Content>
          <DatePicker
            value={selectedDate}
            onChange={date => setSelectDate(date)}
          />
        </Popover.Content>
      </Popover.Root>

      {error && (
        <div className="flex gap-2 items-center mt-2 text-red-900">
          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  );
}
