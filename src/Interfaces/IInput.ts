import { IconType } from "react-icons";

export interface IInputTypes {
  id: string;
  Icon?: IconType;
  htmlFor?: string;
  valueLabel?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean | undefined;
  isLoading?: boolean | undefined;
  touched?: boolean | undefined
  error?: string | undefined;
  type: 'text' | 'email' | 'password' | 'datepicker';
  onClick?: (e: React.MouseEventHandler<HTMLInputElement>) => void;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
}