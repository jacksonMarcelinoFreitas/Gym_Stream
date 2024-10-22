import defalt_user from "../../Assets/images/user_default.png"
import { Modal } from "flowbite-react/components/Modal";
import { HiBellAlert } from "react-icons/hi2";
import { ButtonText } from "../ButtonText";
import { TbLogout2 } from "react-icons/tb";
import { useAuth } from "../../Hooks/auth";
import { Button } from "../Button"
import { useState } from "react";

export function Header(){
    const { signOut } = useAuth();
    const [openSignOutModal, setOpenSignOutModal] = useState(false);
    const { user } = useAuth()

    const handleOpenSignOutModal = () => {
		setOpenSignOutModal(true)
	}
    return(
        <header className='flex justify-between items-center w-screen p-2 rounded-b-lg px-6 bg-orange-primary'>
            <div className="flex items-center gap-2">
                <img className="h-9 p-0.5 rounded-full ring-2 bg-stone-300 ring-stone-300 dark:ring-stone-300" src={defalt_user} alt="" />
                <div className="font-medium dark:text-white">
                    <a href="#" className="text-base text-gray-100">{user?.name}</a>
                    <div className="text-xs text-gray-300 dark:text-gray-400">{user?.gym}</div>
                </div>
            </div>

            <div className='flex gap-2 items-center'>
                <Button
                    type="button"
                    value="Configurar alerta"
                    Icon={HiBellAlert}
                    className="inline-flex w-48"
                />
                <ButtonText
                    type="button"
                    value="Sair"
                    Icon={TbLogout2}
                    onClick={handleOpenSignOutModal}
                />
            </div>

            <Modal dismissible show={openSignOutModal} onClose={() => setOpenSignOutModal(false)}>
                <Modal.Header>Deseja mesmo sair?</Modal.Header>
                    {/* <Modal.Body>
                        colocar imagem aqui
                    </Modal.Body> */}
                <Modal.Footer>
                    <Button onClick={() => setOpenSignOutModal(false)} value='Cancelar' className='bg-orange-900 w-full hover:bg-orange-700'/>
                    <Button onClick={() => signOut()} value='Sair' className='bg-orange-primary w-full hover:bg-orange-700'/>
                </Modal.Footer>
            </Modal>
        </header>
    )
}