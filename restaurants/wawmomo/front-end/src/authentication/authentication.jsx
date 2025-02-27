// Dependencies
import { Route, Routes, useNavigate, NavLink } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

// Component
import LoginPage from "./components/login-page";
import RegisterPage from "./components/register-page";
import ForgotPasswordPage from "./components/forgot-password-page";

// Hooks
import AppContext from '../hooks/app-context';


function Authentication() {
    const { checkAuth } = useContext(AppContext);
    const navigate = useNavigate();

    const [ loading, setLoading ] = useState(true)
    const handleLoading = () => {
        setLoading(true)
        let load = setTimeout(() => {
            checkAuth !== false ? 
            navigate("/dash") :
            setLoading(false)
        }, 500)
        return () => clearTimeout(load)
    }
    useEffect(() => {
        handleLoading()
    }, [checkAuth])

    return (
        <Routes>
            <Route path="" element={<>
                <h1>accueil auth</h1> 
                <p>connecté vous pour accéder à votre espace personnel</p>
                <br />
                <NavLink onClick={handleLoading} to="/" >website</NavLink> | 
                <NavLink onClick={handleLoading} to="login" >login</NavLink> | 
                <NavLink onClick={handleLoading} to="forgot-password" >forgot password</NavLink> |
                <NavLink onClick={handleLoading} to="testerror" >testerror</NavLink>
            </>} />

            <Route path="login" element={ loading ? <h1>loading...</h1> : <LoginPage />} />

            <Route path="find-psw" element={<RegisterPage />} />
            <Route path="forgot-password" element={loading ? <h1>loading...</h1> : <ForgotPasswordPage />} />
            <Route path="update-password" element={loading ? <h1>loading...</h1> : <h1>update password</h1>} />
            <Route path="*" element={<>
                <h1>page auth error</h1> 
                <NavLink to="../" >retour</NavLink> 
            </>} />
        </Routes>
    )
}

export default Authentication;