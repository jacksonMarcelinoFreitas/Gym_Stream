import { IconType } from "react-icons";

export interface IInputTypes {
  id: string;
  Icon?: IconType;
  htmlFor?: string;
  className?: string;
  valueLabel?: string;
  placeholder?: string;
  value?: string | number;
  error?: string | undefined;
  touched?: boolean | undefined
  disabled?: boolean | undefined;
  isLoading?: boolean | undefined;
  type: 'text' | 'email' | 'password' | 'datepicker' | 'number';
  onClick?: (e: React.MouseEvent<SVGElement, MouseEvent>) => void;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  min?: number;
  max?: number;
}