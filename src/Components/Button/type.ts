import { ReactNode } from "react";
export interface IButtonTypes {
  value: string | ReactNode;
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
  Icon?: React.ElementType;
  type?: 'submit' | 'button' | 'reset';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}