// Dependencies
import { Route, Routes, useNavigate, NavLink } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

// Component
import LoginPage from "./components/login-page";
import ForgotPasswordPage from "./components/forgot-password-page";
import UpdatePasswordPage from './components/update-password-page';

// Hooks
import AppContext from '../hooks/app-context';


function Authentication() {
    const { checkAuth } = useContext(AppContext);
    const navigate = useNavigate();

    const [ loading, setLoading ] = useState(true)

    const handleLoading = () => {
        // setLoading(true)
        let load = setTimeout(() => {
            checkAuth !== false && checkAuth !== null ? 
            navigate("/dash") : setLoading(false)
        }, 500)
        return () => clearTimeout(load)
    }

    useEffect(() => {
        loading == true ? handleLoading() : null
    }, [loading])

    return (
        <>
        {
            loading ? null : 
            <>
            <NavLink onClick={handleLoading} to="/" >website</NavLink> | 
            <NavLink onClick={handleLoading} to="/auth/login" >login</NavLink> | 
            <NavLink onClick={handleLoading} to="/auth/forgot-password" >forgot password</NavLink> |
            <NavLink onClick={handleLoading} to="/auth/testerror" >testerror</NavLink>
            <br />
            </>
        }
        <Routes>
            <Route path="" element={<>
                <h1>accueil auth</h1> 
                <p>connecté vous pour accéder à votre espace personnel</p>
            </>} />

            <Route path="login" element={ loading ? <h1>loading...</h1> : <LoginPage setLoading={setLoading} />} />

            <Route path="forgot-password" element={loading ? <h1>loading...</h1> : <ForgotPasswordPage />} />
            <Route path="update-password" element={loading ? <h1>loading...</h1> : <UpdatePasswordPage setLoading={setLoading} />} />
            <Route path="*" element={<>
                <h1>page auth error</h1> 
                <NavLink to="../" >retour</NavLink> 
            </>} />
        </Routes>
        </>
    )
}

export default Authentication;