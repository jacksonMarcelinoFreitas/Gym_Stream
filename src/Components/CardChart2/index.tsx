import clock from '../../Assets/images/clock.svg';

export function CardChart2(){
    const metric = {
        avg_treino : "1:20"
    }
    return(
       <div className="relative h-full px-4 py-4 flex-col items-center justify-center overflow-hidden">
            <p className="text-2xl font-medium">Seu treino</p>
            <p className="text-5xl text-violet-primary font-bold">{metric.avg_treino}</p>
            <img src={clock} alt="icone de relógio" className='absolute h-32 top-7 left-60'/>
       </div>
    )
}