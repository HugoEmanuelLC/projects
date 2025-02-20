// Dependencies
import { Route, Routes, Link } from 'react-router-dom';

// Styles
import './styles/index.css'

// Components
import HeaderComponent from './components/header-component/header-component';
import NavbarComponent from './components/navbar-component/navbar-component';

// Pages
import Home from './pages/home-page/home';
import UserPage from './pages/user-page/user-page';
import MenusPage from './pages/menus-page/menus';
import ErrorPage from './pages/error-page/error';


function DashboardRoutes() {
    return (
        <div id="dashboard">
            <div id="global_bloc">

                <NavbarComponent />

                <div id="main_bloc">

                    <HeaderComponent />

                    <main>
                        <Routes>
                            <Route path="" element={<Home />} />
                            <Route path="login" element={<Home />} />
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