import anilha from '../../Assets/images/anilha.svg';

export function CardChart(){
    return(
       <div className="h-full px-4 py-4 flex-col  relative rounded-lg">
            <p className="text-2xl font-bold">Olá Jackson!</p>
            <span className="text-lg font-medium">Frequência na academia</span>
            <p className="[font-size:clamp(1rem,2.8vw,5rem)] text-6xl text-violet-primary font-bold">7<span className='font-medium'>x</span></p>
            <img src={anilha} alt="icone de relógio" className='absolute h-20 top-10 left-60 -rotate-45 '/>
       </div>
    )
}