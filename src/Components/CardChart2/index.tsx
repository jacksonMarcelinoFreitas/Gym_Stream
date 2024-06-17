import clock from '../../Assets/images/clock.svg';

export function CardChart2(){
    return(
       <div className="flex-col overflow-hidden relative bg-orange-primary ">
            <p className="text-2xl">Seu treino</p>
            <p className="text-5xl text-violet-primary font-bold">1:20</p>
            <img src={clock} alt="icone de relógio" className='static bottom-2 left-32'/>
       </div> 
    )
}