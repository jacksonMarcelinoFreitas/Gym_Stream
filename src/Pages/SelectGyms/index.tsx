import login_image from '../../Assets/images/login_image.png';
import { schema } from '../../Utils/form-schema-select-gyms';
import { useLocation, useNavigate } from 'react-router-dom';
import { Select } from 'flowbite-react/components/Select';
import { Button } from "../../Components/Button";
import { useEffect, useState } from 'react';
import { useAuth } from '../../Hooks/auth';
import { useFormik } from 'formik';

interface ILoginState {
	login: string;
	password: string;
}

interface IGym {
	gymExternalId: string;
	name: string;
	customer: string;
}

interface IListGymResponse {
	token: string | null;
	listGyms: IGym[];
	gym: string | null;
	admin: boolean;
}

export function SelectGyms() {
	const location = useLocation();
	const { signIn } = useAuth();
	const { user } = useAuth()

	let [listGymUser, setListGymUser] = useState<IListGymResponse>({
		listGyms: [],
		gym: null,
		admin: false,
		token: null,
	});

	const { login, password } = location.state as ILoginState;

	useEffect(() => {
		const fetchData = async () => {
			if (user == null) {
				navigate('/login')
			}

			if (user?.listGyms && user?.listGyms.length > 0) {
				const listGymResponse = {
					listGyms: user?.listGyms,
					gym: null,
					admin: false,
					token: null,
				}
				setListGymUser(listGymResponse);
			}
		};

		fetchData();
	}, [])

	const navigate = useNavigate()
	const formik = useFormik(
		{
			initialValues: {
				customer: '',
			},
			validationSchema: schema,
			onSubmit:
				async (values, { setSubmitting }) => {
					setSubmitting(true);
					const { customer } = values;
					try {
						const response = await signIn({
							login,
							password,
							customerGym: customer,
							isLoginConfirmation: true
						})
						// console.log(response)

						if (response.status === 200) {
							navigate('/login')
						}

					} catch (error) {
						console.error("Erro no registro:", error);
					} finally {
						setSubmitting(false);
					}
				},
		})

	return (
		<div className="h-screen flex bg-white">
			<div className='w-3/5 flex flex-col justify-center items-center'>
				<form onSubmit={formik.handleSubmit} className="flex flex-col items-left gap-3 w-2/4 px-16">
					{
						listGymUser.listGyms.length > 0 ?
							<>
								<h1 className='text-lg font-bold size-6 w-full'>Academias do usuário</h1>
								<div className='w-full flex flex-col gap-1'>
									<Select
										required
										id='gyms'
										value={formik.values.customer}
										onChange={(e) => {
											formik.setFieldValue('customer', e.target.value);
										}}
										onBlur={formik.handleBlur}
									>
										<option label="Selecione uma academia" />
										{listGymUser.listGyms.map((gym) => (
											<option
												key={gym.gymExternalId}
												id={gym.customer}
												value={gym.customer}
											>
												{gym.name}
											</option>
										))}

									</Select>
									{formik.errors.customer && formik.touched.customer ?
										(<span className='text-sm text-orange-600'>{formik.errors.customer}</span>) : null
									}
								</div>
							</>
							:
							listGymUser.listGyms.length == 0 ?
								<p className='w-full text-center font-medium text-xl text-orange-400'>Não foram encontrados academias para este usuário!</p>
								:
								<p className='w-full text-center font-medium text-xl text-orange-400'>Usuário não encontrado!</p>

					}
					<div className='flex w-ful justify-center gap-2 mt-4'>
						<Button
							type='button'
							value={listGymUser.listGyms.length > 0 ? 'Cancelar' : 'Voltar'}
							onClick={() => { navigate('/login') }}
							className='text-stone-700 bg-orange-900 shadow-xl hover:bg-orange-500 focus:ring-2 focus:outline-none focus:ring-gray-500'
						/>
						{listGymUser.listGyms.length > 0 && (
							<Button
								type='submit'
								value='Entrar'
								isLoading={formik.isSubmitting}
								disabled={!formik.isValid || formik.isSubmitting}
								className='bg-orange-primary hover:bg-orange-500 focus:ring-2 focus:outline-none focus:ring-orange-300'
							/>
						)}
					</div>
				</form>
				<span className='text-sm font-medium text-gray-900 pt-2'>Não tem conta? <input type='button' value='Register' onClick={() => { navigate("/register") }} className='text-orange-500 font-semibold hover:text-orange-600 cursor-pointer' /></span>
			</div>
			<div
				style={{ backgroundImage: `url(${login_image})` }}
				className="relative h-full w-2/5 flex flex-col items-center justify-evenly bg-stone-200 rounded-r-2xl overflow-hidden bg-no-repeat bg-center bg-cover rounded-l-2xl"
			>
				<div className='absolute w-full h-full z-0 bg-gradient-to-t from-orange-400 from-0%' ></div>
			</div>
		</div>
	);
}

