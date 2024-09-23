import { Datepicker, Label } from "flowbite-react"
import { popupDatepickerCustomTheme } from "./style"

import { IInputTypes } from '../../Interfaces/IInput';

interface ICustomDatepickerProps extends IInputTypes {
    onSelectedDateChanged: (date: Date) => void;
}

export function CustomDatepicker({id, htmlFor, valueLabel, value, error, touched, placeholder, onSelectedDateChanged}: ICustomDatepickerProps) {
    return(
        <div className="w-full flex flex-col gap-1">
            <Label
                htmlFor={ htmlFor }
                value={ valueLabel }
                className='block text-sm font-medium text-gray-900 dark:text-white'
            />
            <Datepicker
                id={id}
                value={value}
                language="pt-BR"
                labelTodayButton="Hoje"
                labelClearButton="Limpar"
                title="Data de nascimento"
                placeholder={placeholder}
                theme={popupDatepickerCustomTheme}
                onSelectedDateChanged={(date: Date) => onSelectedDateChanged(date)}
            />
            {
                touched && error ?
                (<span className='text-sm text-orange-600'>{error}</span>) : null
            }
        </div>
    )
}