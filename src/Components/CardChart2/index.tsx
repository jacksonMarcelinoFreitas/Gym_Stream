import { useEffect, useState } from 'react';
import clock from '../../Assets/images/clock.svg';
import { homeService } from '../../Pages/Service';
import { useAuth } from '../../Hooks/auth';

export function CardChart2(){
    const [duration, setDuration] = useState(null);
    const { user } = useAuth()

    useEffect(() => {
        const fetchTrainingTime = async () => {
            try {
                const result = await homeService.getTrainingTimeDay(user);
                setDuration(result.trainingTimeDay);
            } catch (error) {
                console.error("Erro ao buscar a duração do treino:", error);
            }
        };

        fetchTrainingTime();
    }, []);
    
    return(
       <div className="relative h-full px-4 py-4 flex-col items-center justify-center overflow-hidden" style={{display: 'grid', gridTemplateColumns: '2fr 1fr'}}>
        <div style={{alignSelf: 'start'}}>
            <p className="text-lg font-medium">Duração do treino hoje</p>
            <p className="text-4xl text-violet-primary font-bold">{duration}</p>
        </div>
        <div className='max-w-full' style={{alignContent: 'center'}}>
            <img src={clock} alt="icone de relógio" className='h-32 top-7 left-60'/>
        </div>
       </div>
    )
}