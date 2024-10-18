import { IconType } from "react-icons";

export interface IInputTypes {
  id: string;
  value?: string;
  Icon?: IconType;
  htmlFor?: string;
  valueLabel?: string;
  placeholder?: string;
  error?: string | undefined;
  touched?: boolean | undefined
  disabled?: boolean | undefined;
  isLoading?: boolean | undefined;
  type: 'text' | 'email' | 'password' | 'datepicker';
  onClick?: (e: React.MouseEvent<SVGElement, MouseEvent>) => void;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
}