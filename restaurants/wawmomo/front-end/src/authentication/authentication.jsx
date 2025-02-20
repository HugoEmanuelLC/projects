// Dependencies
import { Route, Routes, Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';

// Component
import LoginPage from "./components/login-page";
import RegisterPage from "./components/register-page";
import ForgotPasswordPage from "./components/forgot-password-page";

// Hooks
import AppContext from '../hooks/app-context';


function Authentication() {
    const app = useContext(AppContext);

    return (
        <Routes>
            <Route path="" element={<>
                <h1>accueil auth</h1> 
                <p>connecté vous pour accéder à votre espace personnel</p>
                <br />
                <NavLink to="/" >website</NavLink> | 
                <NavLink to="login" >login</NavLink> | 
                <NavLink to="register" >register</NavLink> |
                <NavLink to="testerror" >testerror</NavLink>
            </>} />

            <Route path="login" element={app.checkAuth ? <>
                <h3>vous êtes déjà connecté</h3>
                <NavLink to="/">website</NavLink> |
                <NavLink to="/dash">dash</NavLink>
            </> : <LoginPage />} />

            <Route path="register" element={<RegisterPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route path="*" element={<>
                <h1>page auth error</h1> 
                <NavLink to="../" >retour</NavLink> 
            </>} />
        </Routes>
    )
}

export default Authentication;