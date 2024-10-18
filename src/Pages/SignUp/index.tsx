import men_woman_gym from '../../Assets/images/men_woman_gym.png';
import logo from '../../Assets/images/gym_stream_logo.svg';
import { useSignUp } from '../../Pages/SignUp/Service';
import { schema } from '../../Utils/form-schema-signUp';
import { Checkbox } from '../../Components/Checkbox';
import { Button } from "../../Components/Button";
import { HiMail, HiKey } from "react-icons/hi";
import { Input } from "../../Components/Input"
import { FaUser } from "react-icons/fa";
import { Modal } from 'flowbite-react'
import { useFormik } from 'formik';
import { useState } from 'react';

export function SignUp() {
	const { handleSignUp } = useSignUp()
	const [openTermModal, setOpenTermModal] = useState(false);
	const [openConditionModal, setOpenConditionModal] = useState(false);
	
	const handleOpenTermModal = () => {
		setOpenTermModal(true)
	}

	const handleOpenConditionModal = () => {
		setOpenConditionModal(true)
	}

	const formik = useFormik(
	{
		initialValues:{
			name:'',
			email:'',
			password:'',
			newPassword:'',
			readTerms: false,
			isUserAdmin: false
		},
		validationSchema: schema,
		onSubmit:
		async (values, { setSubmitting }) => {
			setSubmitting(true);
			const { name, email, password, newPassword, readTerms, isUserAdmin } = values;
			try {
				await handleSignUp({  name, email, password, newPassword, readTerms, isUserAdmin });
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


					<Checkbox 
						id='isUserAdmin'
						onBlur={formik.handleBlur}
						onChange={formik.handleChange}
						error={formik.errors.isUserAdmin}
						value={formik.values.isUserAdmin}
						touched={formik.touched.isUserAdmin}
						valueLabel={
							<>
								Sou <span className='font-bold text-orange-primary hover:font-bold'>Admin</span>
							</>
						}
					/>

					<Checkbox 
						id='readTerms'
						onBlur={formik.handleBlur}
						onChange={formik.handleChange}
						error={formik.errors.readTerms}
						value={formik.values.readTerms}
						touched={formik.touched.readTerms}
						valueLabel={
							<>
								Aceito os <a href="#" onClick={handleOpenTermModal} className='text-orange-primary hover:font-semibold'>termos</a> e <a href="#"  onClick={handleOpenConditionModal} className='text-orange-primary hover:font-semibold'>condições</a>
							</>
						}
					/>

					<Modal dismissible show={openTermModal} onClose={() => setOpenTermModal(false)}>
						<Modal.Header>Termos de serviço</Modal.Header>
						<Modal.Body>
							<div className="space-y-6">
								<h2 className="text-2xl font-bold text-gray-900 dark:text-white">
								Termos de Uso - GymStream
								</h2>
								
								<section>
								<h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
									1. Aceitação dos Termos
								</h3>
								<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
									Ao utilizar a plataforma GymStream, você concorda com os termos e condições descritos neste documento. Caso não concorde com algum dos termos, pedimos que não utilize nossos serviços.
								</p>
								</section>

								<section>
								<h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
									2. Descrição do Serviço
								</h3>
								<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
									GymStream oferece uma plataforma digital para a transmissão de conteúdo relacionado a exercícios físicos, treinamentos e bem-estar. O objetivo é proporcionar aos usuários acesso a vídeos, aulas ao vivo, e conteúdos educativos na área de fitness.
								</p>
								</section>

								<section>
								<h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
									3. Cadastro e Segurança
								</h3>
								<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
									Para utilizar o GymStream, é necessário criar uma conta. Você é responsável por manter a confidencialidade de suas credenciais de acesso e por todas as atividades realizadas através da sua conta.
								</p>
								</section>

								<section>
								<h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
									4. Política de Privacidade
								</h3>
								<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
									Nós respeitamos a privacidade de nossos usuários e nos comprometemos a proteger as informações pessoais fornecidas. Consulte nossa Política de Privacidade para obter mais informações sobre o tratamento de seus dados.
								</p>
								</section>

								<section>
								<h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
									5. Modificações nos Termos
								</h3>
								<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
									O GymStream se reserva o direito de alterar estes termos a qualquer momento. Notificaremos os usuários sobre mudanças significativas. O uso contínuo da plataforma após as alterações constitui sua aceitação dos novos termos.
								</p>
								</section>
							</div>
						</Modal.Body>
						<Modal.Footer>
							<Button onClick={() => setOpenTermModal(false)} value='Ok' className=' text-orange-primary w-full'/>
						</Modal.Footer>
					</Modal>
					<Modal dismissible show={openConditionModal} onClose={() => setOpenConditionModal(false)}>
						<Modal.Header>Condições de uso</Modal.Header>
						<Modal.Body>
							<div className="space-y-6">
								<h2 className="text-2xl font-bold text-gray-900 dark:text-white">
								Condições de Uso - GymStream
								</h2>
								
								<section>
								<h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
									1. Uso da Plataforma
								</h3>
								<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
									O uso da plataforma GymStream é destinado exclusivamente para fins pessoais e não comerciais. Você concorda em utilizar o GymStream de maneira legal e em conformidade com todas as leis aplicáveis.
								</p>
								</section>

								<section>
								<h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
									2. Direitos de Propriedade Intelectual
								</h3>
								<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
									Todo o conteúdo disponível no GymStream, incluindo vídeos, textos, gráficos, imagens e marcas registradas, são de propriedade da plataforma ou de seus licenciados. Você não tem permissão para copiar, modificar ou distribuir qualquer conteúdo sem autorização expressa.
								</p>
								</section>

								<section>
								<h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
									3. Conduta do Usuário
								</h3>
								<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
									Você concorda em não utilizar a plataforma para qualquer atividade ilegal, incluindo, mas não se limitando a, fraudes, abusos ou compartilhamento de informações pessoais de outros usuários sem consentimento.
								</p>
								</section>

								<section>
								<h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
									4. Suspensão ou Encerramento de Conta
								</h3>
								<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
									O GymStream se reserva o direito de suspender ou encerrar a sua conta a qualquer momento, caso identifique o descumprimento das condições estabelecidas ou qualquer comportamento prejudicial à plataforma ou outros usuários.
								</p>
								</section>

								<section>
								<h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
									5. Limitação de Responsabilidade
								</h3>
								<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
									O GymStream não se responsabiliza por quaisquer danos diretos, indiretos ou incidentais resultantes do uso da plataforma, incluindo falhas técnicas, interrupções de serviço ou perda de dados.
								</p>
								</section>

								<section>
								<h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
									6. Alterações nas Condições
								</h3>
								<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
									Reservamo-nos o direito de modificar estas condições de uso a qualquer momento. Os usuários serão notificados sobre mudanças importantes e o uso contínuo da plataforma implicará na aceitação das condições revisadas.
								</p>
								</section>
							</div>
						</Modal.Body>

						<Modal.Footer>
							<Button onClick={() => setOpenConditionModal(false)} value='Ok' className=' text-orange-primary w-full'/>
						</Modal.Footer>
					</Modal>

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
