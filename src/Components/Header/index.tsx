import { Button } from "../Button"
import { ButtonText } from "../ButtonText";
import { TbLogout2 } from "react-icons/tb";
import { HiBellAlert } from "react-icons/hi2";
import defalt_user from "../../Assets/images/user_default.png"

export function Header(){
    return(
        <header className='flex justify-between items-center w-screen p-2 rounded-b-lg px-6 bg-orange-600'>
            <div className="flex items-center gap-2">
                <img className="h-9 p-0.5 rounded-full ring-2 bg-gray-500 ring-gray-300 dark:ring-gray-500" src={defalt_user} alt="" />
                <div className="font-medium dark:text-white">
                    <a href="#" className="text-base text-gray-100">Jhon Doe</a>
                    <div className="text-xs text-gray-300 dark:text-gray-400">GV Academia</div>
                </div>
            </div>

            <div className='flex gap-2 items-center'>
                <Button 
                    type="button" 
                    value="Configurar alerta"
                    Icon={HiBellAlert}
                />
                <ButtonText
                    type="button" 
                    value="Sair"
                    Icon={TbLogout2}
                />
            </div>
        </header>
    )
}