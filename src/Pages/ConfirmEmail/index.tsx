import login_image from '../../Assets/images/login_image.png';
import email_image from '../../Assets/images/email_image.png';
import { signUpService } from '../SignUp/Service';
import { schema } from '../../Utils/form-schema-signUp';
import { Button } from "../../Components/Button";
import { HiMail } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import { Input } from "../../Components/Input"
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { useState } from 'react';

export function ConfirmEmail() {
	// const { email, setEmail } = useState('')
	// const { token, setToken } = useState('')

	const navigate = useNavigate()
	const formik = useFormik(
	{
		initialValues:{
			tokenEmail:'',
		},
		validationSchema: schema,
		onSubmit:
		async (values, { setSubmitting }) => {
			setSubmitting(true);
			const { tokenEmail } = values;
			try {
				await new Promise(resolve => setTimeout(resolve, 10000));
				signUpService.handleConfirmEmail({ tokenEmail })
				toast.success("Cadastro realizado com sucesso!");
			} catch(error: any) {
				if(error.response){
					if(error.response == 403){
						toast.error(error.response.data.message);
					}
				}
				else {
					toast.error(`${error}`);
				}
			}
			setSubmitting(false);
		},
	})

	function resendEmailtoken(){
		// const email = 'teste@gmail.com'
		window.alert('teste')
		// signUpService.handleConfirmEmail({ email })
	}

	return (
		<div className="h-screen flex bg-white">
			<div className='w-3/5 flex flex-col justify-center items-center'>
				<form onSubmit={formik.handleSubmit} className="flex flex-col items-left gap-3 w-2/4 px-16">
					<img src={email_image} alt="Imagem de uma carta" className='mb-4 w-32'/>
					<h1 className='text-lg font-bold size-6 w-full'>Confirmar e-mail</h1>
					<Input
						type='text'
						id='tokenEmail'
						Icon={HiMail}
						htmlFor='tokenEmail'
						valueLabel='Por favor, informe o token enviado ao seu e-mail'
						onBlur={formik.handleBlur}
						value={formik.values.tokenEmail}
						error={formik.errors.tokenEmail}
						onChange={formik.handleChange}
						touched={formik.touched.tokenEmail}
						placeholder='XXXXX-XXXXX-XXXXX'
					/>
					<div className='flex w-full gap-2 mt-4'>
						<Button
							type='button'
							value='Cancelar'
							onClick={() => { navigate('/register') }}
							className='text-stone-700 bg-gray-200 shadow-xl hover:bg-gray-400 focus:ring-2 focus:outline-none focus:ring-gray-500'
						/>
						<Button
							type='submit'
							value='Confirmar'
							isLoading={formik.isSubmitting}
							disabled={!formik.isValid || formik.isSubmitting}
							className=' bg-orange-primary hover:bg-orange-500 focus:ring-2 focus:outline-none focus:ring-orange-300'
						/>
					</div>
				</form>
				<span className='text-sm font-medium text-gray-900 pt-2'>Não recebeu o e-mail? <input type='button' value='Reenviar' onClick={ resendEmailtoken } className='text-orange-500 font-semibold hover:text-orange-600 cursor-pointer'/></span>
			</div>
			<div
				style={{ backgroundImage: `url(${login_image})`}}
				className="relative h-full w-2/5 flex flex-col items-center justify-evenly bg-stone-200 rounded-r-2xl overflow-hidden bg-no-repeat bg-center bg-cover rounded-l-2xl"
			>
				<div className='absolute w-full h-full z-0 bg-gradient-to-t from-orange-400 from-0%' ></div>
			</div>
		</div>
	);
}
