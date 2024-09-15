import ReactDOM from 'react-dom/client'
import { Routes } from './Routes';


ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode> // Comentado porque estava fazendo duas request no modo debugger
      <Routes />
  // </React.StrictMode>,
)
