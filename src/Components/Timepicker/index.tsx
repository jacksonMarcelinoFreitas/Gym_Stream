import classNames from 'classnames';
import React, { ReactNode } from 'react';

interface TimePickerProps {
    id: string
    value: string;
    onChange: (newTime: string) => void;
    min?: string;
    max?: string;
    required?: boolean;
    className?: string
}

const TimePicker: React.FC<TimePickerProps> = ({ id, className, value, onChange, min = "09:00", max = "18:00", required = true }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
      <input
        type="time"
        id={id}
        className={classNames(`bg-gray-50 border-2 leading-none border-orange-200 text-gray-900 text-xl font-medium rounded-lg cursor-pointer focus:ring-orange-300 focus:border-orange-300 block w-full p-2 px-4`, className)}
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        required={required}
      />
  );
};

export default TimePicker;
