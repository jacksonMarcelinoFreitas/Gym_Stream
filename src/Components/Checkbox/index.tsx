import { Label } from "flowbite-react"
import { ICheckbox } from "../../Interfaces/ICheckbox"
  
export function Checkbox({ id, value, valueLabel, onBlur, onChange, error, touched}:ICheckbox){
    return(
        <>
            <div className="flex items-center me-4">
                <input 
                    id={id}
                    type="checkbox" 
                    className="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    checked={value}
                    onBlur={onBlur}
                    onChange={onChange}
                >
                </input>
                <Label 
                    htmlFor={id}
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {valueLabel}
                </Label>
            </div>
            {
                touched && error ?
                (<span className='text-sm text-orange-600'>{error}</span>) : null
            }
        </>
    )

} 