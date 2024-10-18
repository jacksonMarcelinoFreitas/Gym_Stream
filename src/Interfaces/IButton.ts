export interface IButton {
    value: string;
    disabled?: boolean;
    isLoading?: boolean;
    className?: string;
    Icon?: React.ElementType;
    type?: 'submit' | 'button' | 'reset';
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}