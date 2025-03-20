// Dependencies
import { Route, Routes, useNavigate, NavLink, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Pages
import LoginPage from "./pages/login-page/login-page";
import ForgotPasswordPage from "./pages/forgot-password-page/forgot-password-page";
import UpdatePasswordPage from './pages/update-password-page';

// Scripts
import { checkSession, deleteCookie } from './scripts/authentication-scripts';

// Styles
import './styles/index.css';

// Routes si authentifié
import DashboardRoutes from '../dashboard/dashboard-routes';



function Authentication() {
    const [ checkAuth, setCheckAuth ] = useState(null)
    
    const navigate = useNavigate();

    const handleLoading = (res) => {
        let load = setTimeout(() => {
            setCheckAuth(res)
        }, 1000)
        return () => clearTimeout(load)
    }

    const fncCheckSession = async () => {
        checkAuth == null && await checkSession("auth")
        .then((res) => {
            handleLoading(res)
        })
        .catch((err) => {
            handleLoading(false)
        })
        checkAuth == false && null
        checkAuth !== null && checkAuth !== false && navigate("/dash")
    }

    const handleCloseSession = () => {
        deleteCookie("auth")
        setCheckAuth(null)
    }

    useEffect(() => {
        fncCheckSession()
    }, [checkAuth])
    

    return (
        checkAuth == null ? 
            <h1>loading...</h1> : 
        checkAuth == false ? 
            <div id='authentification_bloc'>
                <Routes>
                    <Route path="" element={<>
                        <h1>accueil auth</h1> 
                        <p>connecté vous pour accéder à votre espace personnel</p>
                    </>} />
                    <Route path="auth/login" element={<LoginPage valueCheckAuth={{ checkAuth, setCheckAuth }} />} />
                    <Route path="auth/forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="auth/update-password" element={<UpdatePasswordPage />} />
                    <Route path="*" element={<Navigate to="/dash/auth/login" replace />} />
                </Routes>
            </div> : 
        <DashboardRoutes valueCheckAuth={{ checkAuth, setCheckAuth, handleCloseSession }} />
    )
}

export default Authentication;