import { useEffect, useState } from 'react';
import anilha from '../../Assets/images/anilha.svg';
import { homeService } from '../../Pages/Service';
import { useAuth } from '../../Hooks/auth';

export function CardChart(){
    const [frequency, setFrequency] = useState(null);
    const { user } = useAuth()

    useEffect(() => {
        const fetchTrainingTime = async () => {
            try {
                const result = await homeService.getWeeklyFrequency(user);
                setFrequency(result.weeklyFrequency);
            } catch (error) {
                console.error("Erro ao buscar a duração do treino:", error);
            }
        };

        fetchTrainingTime();
    }, []);
    return(
       <div className="h-full px-4 py-4 flex-col  relative rounded-lg">
            <p className="text-2xl font-bold">Olá, {user?.name.split(" ")[0]}!</p>
            <span className="text-lg font-medium">Frequência na semana</span>
            <p className="[font-size:clamp(1rem,2.8vw,5rem)] text-6xl text-violet-primary font-bold">{frequency}<span className='font-medium'>x</span></p>
            <img src={anilha} alt="icone de relógio" className='absolute h-20 top-10 left-60 -rotate-45 '/>
       </div>
    )
}