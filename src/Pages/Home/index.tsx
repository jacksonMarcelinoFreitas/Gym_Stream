import { Header } from "../../Components/Header";
import { CardChart } from "../../Components/CardChart";
import { CardChart2 } from "../../Components/CardChart2";
import { LineChart } from "../../Components/LineChart";


export function Home(){
    return(
      <div className="h-dvh bg-light-color">
      <Header />
        <main className="h-[var(--full-size)] bg-light-color p-4 ">
            <div className="w-full h-full grid grid-cols-2 grid-flow-row gap-4">
              <div className="grid grid-cols-2 row-span-1 gap-4">
                <div className="w-full h-full bg-stone-300">
                  <CardChart></CardChart>
                </div>
                <div className="w-full h-full bg-stone-300">
                  <CardChart2></CardChart2>
                </div>
              </div>      
              <div className="w-full h-full row-span-1 bg-stone-300">
              </div>
              <div className="w-full h-full row-span-2 bg-stone-300">
                <LineChart></LineChart>
              </div>
              <div className="w-full h-full row-span-2 bg-stone-300">

              </div>
                
              <div className="w-full h-full row-span-2 bg-stone-300">

              </div>
              <div className="w-full h-full row-span-2 bg-stone-300">
              </div>  
            </div>
        </main>
      </div>
    )
}