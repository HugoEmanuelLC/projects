// Dependencies
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useContext, useState, use } from 'react';

// Styles
import './styles/index.css'

// Hooks
import AppContext from '../hooks/app-context';

// Components
import HeaderComponent from './components/header-component/header-component';
import NavbarComponent from './components/navbar-component/navbar-component';

// Pages
import Home from './pages/home-page/home';
import UserPage from './pages/user-page/user-page';
import MenusPage from './pages/menus-page/menus';
import ErrorPage from './pages/error-page/error';


function DashboardRoutes() {
    const { checkAuth } = useContext(AppContext);
    const navigate = useNavigate();

    const [ loading, setLoading ] = useState(true)

    const handleLoading = (close=null) => {
        // setLoading(true)
        let load = setTimeout(() => {
            checkAuth == false ? navigate("/auth/login") : setLoading(false)
        }, 1000)
        return () => clearTimeout(load)
    }

    useEffect(() => {
        loading == true && handleLoading()
    }, [loading])


    return (
        loading ? <h1>loading...</h1> : checkAuth && 
        <div id="dashboard">
            <div id="global_bloc">

                <NavbarComponent handleLoading={handleLoading} setLoading={setLoading} />

                <div id="main_bloc">

                    <HeaderComponent />

                    <main>
                        <Routes>
                            <Route path="" element={<Home />} />
                            <Route path="menus" element={ <MenusPage /> } />
                            <Route path="user-page" element={<UserPage />} />
                            <Route path="*" element={<ErrorPage />} />
                        </Routes>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default DashboardRoutes;