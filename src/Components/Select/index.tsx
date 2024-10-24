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
            className="z-0 bg-white border border-orange-200 text-gray-900 text-sm rounded-lg focus:ring-orange-300 focus:border-orange-300 block w-full ps-10 p-2.5"
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

//Ex.: input do tipo select

{/* <div className='w-full flex flex-col gap-1'>
  <Label
    htmlFor='gender'
    value='Sexo'
    className='block text-sm font-medium text-gray-900 dark:text-white'
  />
  <Select
    required
    id='gender'
    value={formik.values.gender}
    onChange={(e) => {
      formik.setFieldValue('gender', e.target.value);
    }}
    onBlur={formik.handleBlur}
  >
    <option value="" label="Selecione o gênero" />
    <option value="masculino" label="Masculino">Masculino</option>
    <option value="feminino" label="Feminino">Feminino</option>
  </Select>
  {formik.errors.gender && formik.touched.gender ?
    (<span className='text-sm text-orange-600'>{formik.errors.gender}</span>) : null
  }
</div> */}
