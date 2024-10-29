import { Routes, Route } from 'react-router-dom';
import { ConfirmEmail } from '../Pages/ConfirmEmail/';
import { SelectGyms } from '../Pages/SelectGyms/';
import { SignIn } from '../Pages/SignIn/';
import { SignUp } from '../Pages/SignUp/';

export function AuthRoutes(){
  return(
    <Routes>
      <Route path="*" element={ <SignIn/> } />
      <Route path="/login" element={ <SignIn/> } />
      <Route path="/login/select-gym" element={ <SelectGyms/> } />
      <Route path="/register" element={ <SignUp/> } />
      <Route path="/register/confirm-email" element={ <ConfirmEmail/> } />
    </Routes>
  )
}