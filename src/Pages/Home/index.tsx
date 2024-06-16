import { Header } from "../../Components/Header";
import { LineChart } from "../../Components/LineChart";


export function Home(){
    return(
      <div className="h-screen bg-slate-400">
        <Header />
        <main className="h-screen w-screen ">

          <div className="grid gap-4 grid-cols-3 grid grid-rows-3">

            <div className="h-24 w-full bg-white card-chart-1">
            </div>

            <div className="h-24 w-full bg-white card-chart-2">
            </div>

            <div className="h-24 w-full bg-white card-chart-3">
            </div>

            <div className='line-chart w-1/2 h-auto bg-white'>
              <LineChart />
            </div>
            <div className='line-chart w-1/2 h-auto bg-white'>
              <LineChart />
            </div>
            <div className='line-chart w-1/2 h-auto bg-white'>
              <LineChart />
            </div>
            <div className='line-chart w-1/2 h-auto bg-white'>
              <LineChart />
            </div>

          </div>


          {/* <div className='line-chart w-1/2 h-auto bg-white'>
          </div>

          <div className='line-chart w-1/2 h-auto bg-white'>
          </div>

          <div className='line-chart w-1/2 h-auto bg-white'>
          </div>

          <div className='line-chart w-1/2 h-auto bg-white'>
          </div>

          <div className='line-chart w-1/2 h-auto bg-white'>
          </div> */}
            

        </main>
      </div>
    )
}