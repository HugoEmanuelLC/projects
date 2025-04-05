// Dependencies
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import { useEffect, useContext, useState, use } from 'react';

// Styles
import './styles/index.css'

// Hooks
import DashContext from './hooks/dash-context';

// Components
import HeaderComponent from './components/header-component/header-component';
import NavbarComponent from './components/navbar-component/navbar-component';
import LoadingComponent from './components/loading-component/loading-component';

// Pages
import UserPage from './pages/user-page/user-page';
import MenusPage from './pages/menus-and-products-pages/menus-page';
import ProductsPage from './pages/menus-and-products-pages/products-page';
import TimetablePage from './pages/timetable-page/timetable';
import ImagesPage from './pages/images-page/images-page';
import ErrorPage from './pages/error-page/error';

// Images
import logo from '/dashboard/settings_icon.png';


function DashboardRoutes(props) {
    // const { checkAuth } = useContext(DashContext);
    const navigate = useNavigate();

    const [ loading, setLoading ] = useState(true)

    const handleLoading = (close=null) => {
        // setLoading(true)
        let load = setTimeout(() => {
            setLoading(false)
            // checkAuth == false ? navigate("/auth/login") : setLoading(false)
            // console.log("checkAuth : ", checkAuth);
        }, 500)
        return () => clearTimeout(load)
    }

    useEffect(() => {
        loading == true && handleLoading()
    }, [loading])


    useEffect(() => {
        let link = document.querySelector("link[rel~='icon']");
        if (link) {
            link.href = logo;
        } else {
            link = document.createElement("link");
            link.rel = "icon";
            link.href = logo;
            document.head.appendChild(link);
        }

        let title = document.querySelector("title");
        if (title) {
            title.innerHTML = "Dashboard";
        } else {
            title = document.createElement("title");
            title.innerHTML = "Dashboard";
            document.head.appendChild(title);
        }
    }, [])


    return (
        <DashContext.Provider value={props.valueCheckAuth}>
            {loading ? 
            <div id="dashboard_bloc">
                <LoadingComponent />
            </div>
            : 
            <div id="dashboard_bloc">
                <div id="content_bloc">

                    <NavbarComponent handleLoading={handleLoading} setLoading={setLoading} />

                    <div id="main_bloc">

                        <HeaderComponent />

                        <main>
                            <Routes>
                                <Route path="" element={<Navigate to="menus" replace />} />
                                <Route path="menus" element={ <MenusPage /> } />
                                <Route path="produits" element={ <ProductsPage /> } />
                                <Route path="user-page" element={<UserPage />} />
                                <Route path='horaires' element={<TimetablePage />} />
                                <Route path='images' element={<ImagesPage />} />
                                <Route path="*" element={<ErrorPage />} />
                            </Routes>
                        </main>
                    </div>
                </div>
            </div>}
        </DashContext.Provider>
    );
}

export default DashboardRoutes;