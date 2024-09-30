import { Routes, Route } from 'react-router-dom';
import { AdminPannel } from '../Pages/AdminPannel';

export function AdminRoutes(){
    return(
      <Routes>
        <Route path="*" element={ <AdminPannel/> } />
      </Routes>
    )
  }