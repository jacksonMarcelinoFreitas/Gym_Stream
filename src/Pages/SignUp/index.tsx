import men_woman_gym from '../../Assets/images/men_woman_gym.png';
import { useSignUp } from '../../Pages/SignUp/Service';
import logo from '../../Assets/images/gym_stream_logo.svg';
import { schema } from '../../Utils/form-schema-signUp';
import { Button } from "../../Components/Button";
import { HiMail, HiKey } from "react-icons/hi";
import { FaUser } from "react-icons/fa";
import { Input } from "../../Components/Input"
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

export function SignUp() {
	const { handleSignUp } = useSignUp()
	const formik = useFormik(
	{
		initialValues:{
			name:'',
			email:'',
			password:'',
			newPassword:''
		},
		validationSchema: schema,
		onSubmit:
		async (values, { setSubmitting }) => {
			setSubmitting(true);
			const { name, email, password, newPassword } = values;
			try {
				await handleSignUp({  name, email, password, newPassword });
			} catch (error) {
				console.error("Erro no registro:", error);
			} finally {
				setSubmitting(false);
			}
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
						Icon={FaUser}
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
