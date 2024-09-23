import { IInputTypes } from '../../Interfaces/IInput';

export function Input({ Icon, htmlFor, valueLabel, placeholder, id, type, value, disabled, error, touched, onBlur, onChange, onClick, ...rest }: IInputTypes) {
  return (
    <>
      <div className='w-full'>
        {valueLabel && (
          <label htmlFor={htmlFor} className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
            {valueLabel}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <Icon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </div>
          )}
          <input
            {...rest}
            id={id}
            type={type}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            disabled={disabled}
            placeholder={placeholder}
            className="bg-white border border-orange-200 text-gray-900 text-sm rounded-lg focus:ring-orange-300 focus:border-orange-300 block w-full ps-10 p-2.5"
          />
        </div>
        {
          touched && error ?
          (<span className='text-sm text-orange-600'>{error}</span>) : null
        }
      </div>
    </>
  );
}
