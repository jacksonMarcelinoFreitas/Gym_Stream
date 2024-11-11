import classNames from 'classnames';
import { IInputTypes } from '../../Interfaces/IInput';

export function Input({ Icon, htmlFor, valueLabel, placeholder, id, type, value, disabled, error, touched, onBlur, onChange, onClick, className, ...rest }: IInputTypes) {
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
            <div className="absolute inset-y-0 start-0 z-10 flex items-center ps-3.5 pointer-events-none">
              <Icon id='icone' onClick={onClick} className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:" />
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
            className={classNames(`z-0 bg-white border-2 border-orange-200 text-gray-900 text-sm rounded-lg focus:ring-orange-300 focus:border-orange-300 block w-full p-2.5 ${Icon ? "ps-10" : ""}`, className)}
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
