import clock from '../../Assets/images/anilha.svg';

export function CardChart(){
    return(
       <div className="flex-col overflow-hidden relative bg-orange-primary ">
            <p className="text-2xl font-bold">Olá Jackson!</p>
            <span className="text-lg">Frequência na academia</span>
            <p className="text-6xl text-violet-primary font-bold">7<span className='font-medium'>x</span></p>
            <img src={clock} alt="icone de relógio" className='static bottom-2 left-32'/>
       </div> 
    )
}