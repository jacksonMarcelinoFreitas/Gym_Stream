import { Routes, Route } from 'react-router-dom';

import { SignIn } from '../Pages/SignIn';
import { SignUp } from '../Pages/SignUp/';
import { ConfirmEmail } from '../Pages/ConfirmEmail/';

export function AuthRoutes(){
    return(
      <Routes>
        <Route path="*" element={ <SignIn/> } />
        <Route path="/" element={ <SignIn/> } />
        <Route path="/register" element={ <SignUp/> } />
        <Route path="/confirmEmail" element={ <ConfirmEmail/> } />
      </Routes>
    )
  }