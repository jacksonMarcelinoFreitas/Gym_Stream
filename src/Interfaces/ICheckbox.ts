export interface ICheckbox {
    id: string,
    value: boolean,
    valueLabel: React.ReactNode,
    error?: string | undefined;
    touched?: boolean | undefined
    disabled?: boolean | undefined;
    isLoading?: boolean | undefined;
    onClick?: (e: React.MouseEvent<SVGElement, MouseEvent>) => void;
    onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
}