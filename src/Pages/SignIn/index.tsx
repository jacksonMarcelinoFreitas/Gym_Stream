import login_image from '../../Assets/images/login_image.png';
import logo from '../../Assets/images/gym_stream_logo.svg';
import { schema } from '../../Utils/form-schema-signIn';
import { Button } from "../../Components/Button";
import { HiMail, HiKey } from "react-icons/hi";
import { Input } from "../../Components/Input"
import { useFormik } from 'formik';
import { useAuth } from '../../Hooks/auth';

export function SignIn() {
	const { signIn } = useAuth();
	const formik = useFormik(
	{
		initialValues:{
			email:'',
			password:'',
		},
		validationSchema: schema,
		onSubmit:
		async (values, { setSubmitting }) => {
			setSubmitting(true);
			const { email, password } = values;
			try {
				await signIn({ email, password });
			} catch (error) {
				console.error("Erro no login:", error);
			} finally {
				setSubmitting(false);
			}
			setSubmitting(false);
		},
	})

	return (
		<div className="h-screen flex bg-white">
			<div className='w-3/5 flex flex-col justify-center items-center'>
				<img src={logo} alt="Logo do GymStream" className='w-1/4 z-30 mb-8'/>
				<form onSubmit={formik.handleSubmit} className="flex flex-col items-center gap-3 w-3/4 px-16">
					<h1 className='text-lg font-bold size-6 w-full'>Entrar</h1>
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
						id='password'
						htmlFor='password'
						valueLabel='Senha'
						onBlur={formik.handleBlur}
						value={formik.values.password}
						onChange={formik.handleChange}
						error={formik.errors.password}
						touched={formik.touched.password}
						type='password'
						Icon={HiKey}
					/>

					<Button
						type='submit'
						value='Registrar'
						isLoading={formik.isSubmitting}
                		disabled={!formik.isValid || formik.isSubmitting}
						className=' bg-orange-primary hover:bg-orange-500 focus:ring-2 focus:outline-none focus:ring-orange-300'
					/>
				</form>
				<span className='text-sm font-medium text-gray-900 pt-2'>Não tem uma conta?<a className='text-orange-500 font-semibold hover:text-orange-600' href="/register"> Registre-se </a></span>
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
