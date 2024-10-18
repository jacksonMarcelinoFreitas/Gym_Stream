import { Routes, Route } from 'react-router-dom';
import { Home } from '../Pages/Home';

export function AppRoutes(){
    return(
        <Routes>
            <Route path="/home" element={ <Home/> } />
        </Routes>
    )
}