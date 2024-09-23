import men_woman_gym from '../../Assets/images/men_woman_gym.png';
import { CustomDatepicker } from '../../Components/Datepicker';
import { signUpService } from '../../Pages/SignUp/Service';
import logo from '../../Assets/images/gym_stream_logo.svg';
import { schema } from '../../Utils/form-schema-signUp';
import { Button } from "../../Components/Button";
import { HiMail, HiKey } from "react-icons/hi";
import {Label, Select } from "flowbite-react";
import { Input } from "../../Components/Input"
import { toast } from 'react-toastify';
import { useFormik } from 'formik';

export function SignUp() {
	const formik = useFormik(
	{
		initialValues:{
			name:'',
			email:'',
			gender:'',
			password:'',
			birthday: '',
			newPassword:''
		},
		validationSchema: schema,
		onSubmit:
		async (values, { setSubmitting }) => {
			setSubmitting(true);
			const { name, email, password, newPassword, birthday, gender } = values;
			try {
				await new Promise(resolve => setTimeout(resolve, 10000));
				signUpService.handleSignIn({ name, email, password, newPassword, birthday, gender })
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

	return (
		<div className="h-screen flex bg-white">
			<div className='relative h-full w-2/5 flex flex-col items-center justify-evenly bg-stone-200 rounded-r-2xl overflow-hidden'>
				<img src={logo} alt="Logo do GymStream" className='w-1/3 z-30'/>
				<img src={men_woman_gym} alt="" className='w-1/2 z-2'/>
				<div className='absolute w-full h-full z-0 bg-gradient-to-t from-orange-400 from-0%' ></div>
			</div>
			<div className='w-3/5 flex flex-col justify-center items-center'>
				<form onSubmit={formik.handleSubmit} className="flex flex-col items-center gap-3 w-3/4 px-16">
					<h1 className='text-lg font-bold size-6 w-full'>Cadastre-se</h1>
					<Input
						id='name'
						type='text'
						Icon={HiMail}
						htmlFor='name'
						valueLabel='Nome'
						placeholder='Jhon Doe'
						onBlur={formik.handleBlur}
						error={formik.errors.name}
						value={formik.values.name}
						touched={formik.touched.name}
						onChange={formik.handleChange}
					/>

					<Input
						type='email'
						id='email'
						Icon={HiMail}
						htmlFor='email'
						valueLabel='Email'
						onBlur={formik.handleBlur}
						value={formik.values.email}
						error={formik.errors.email}
						onChange={formik.handleChange}
						touched={formik.touched.email}
						placeholder='JhonDoe@gmail.com'
					/>

					<Input
						Icon={HiKey}
						id='password'
						type='password'
						valueLabel='Senha'
						htmlFor='password'
						onBlur={formik.handleBlur}
						value={formik.values.password}
						onChange={formik.handleChange}
						error={formik.errors.password}
						touched={formik.touched.password}
					/>

					<Input
						Icon={HiKey}
						id='newPassword'
						type='password'
						htmlFor='password'
						valueLabel='Confirme a senha'
						onBlur={formik.handleBlur}
						onChange={formik.handleChange}
						error={formik.errors.newPassword}
						value={formik.values.newPassword}
						touched={formik.touched.newPassword}
					/>

					<CustomDatepicker
						id='birthday'
						type='datepicker'
						htmlFor='birthday'
						valueLabel='Data de nascimento'
						value={formik.values.birthday}
						error={formik.errors.birthday}
						placeholder='Selecione uma data'
						touched={formik.touched.birthday}
						onSelectedDateChanged={(date: Date) => formik.setFieldValue('birthday', date.toISOString().split('T')[0])}
					/>

					<div className='w-full flex flex-col gap-1'>
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
					</div>

					<Button
						type='submit'
						value='Registrar'
						isLoading={formik.isSubmitting}
                		disabled={!formik.isValid || formik.isSubmitting}
						className='bg-orange-primary hover:bg-orange-500 focus:ring-2 focus:outline-none focus:ring-orange-300'
					/>
				</form>
				<span className='text-sm font-medium text-gray-900 pt-2'>Já tem uma conta?<a className='text-orange-500 font-semibold hover:text-orange-600' href="/"> Login </a></span>
			</div>
		</div>
	);
}
