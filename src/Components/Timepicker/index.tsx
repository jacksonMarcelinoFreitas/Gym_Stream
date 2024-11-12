import classNames from 'classnames';
import React from 'react';

interface TimePickerProps {
    id: string
    value: string;
    onChange?: (newTime: string) => void;
    min?: string;
    max?: string;
    required?: boolean;
    className?: string;
    disabled?: boolean;
}

const TimePicker: React.FC<TimePickerProps> = ({ id, className, value, onChange, min, max, required = true, disabled }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
      <input
        type="time"
        id={id}
        className={classNames(`bg-gray-50 border-2 leading-none border-orange-200 text-gray-900 text-xl font-medium rounded-lg cursor-pointer focus:ring-orange-300 focus:border-orange-300 block w-full p-2 px-4 disabled:text-gray-400`, className)}
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        required={required}
        disabled={disabled}
      />
  );
};

export default TimePicker;
