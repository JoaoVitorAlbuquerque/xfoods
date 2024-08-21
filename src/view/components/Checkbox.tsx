import { CrossCircledIcon } from "@radix-ui/react-icons";
import { useState } from "react";

interface CheckboxProps {
  label: string;
  icon: string;
  id: string;
  error?: string;
}

export function Checkbox({ label, icon, id, error }: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(false);

  function handleCheckboxChange() {
    setIsChecked(prevState => prevState === false ? true : false);
  }

  return (
    <div>
      <label className="flex items-center border rounded-lg p-4" htmlFor={id} role="button">
        <span className="mr-2">
          <span>{icon}</span>
        </span>
        <span className="flex-grow text-gray-400 font-normal">{label}</span>
        <input
          role="button"
          type="checkbox"
          checked={isChecked}
          id={id}
          onChange={handleCheckboxChange}
          className="form-checkbox text-red-500 rounded focus:ring-0"
        />
      </label>

      {error && (
        <div className="flex gap-2 items-center mt-2 text-red-900">
          <CrossCircledIcon />

          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  );
}
