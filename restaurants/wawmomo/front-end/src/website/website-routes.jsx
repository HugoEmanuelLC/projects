// Dependencies
import { useEffect, useState } from "react";
import { Route, Routes, NavLink } from 'react-router-dom';

// Styles
import './styles/index.css'

// Pages and Components
import Home from './pages/home';
import HeaderComponent from './components/header-component/header-component';
import Popup from "./components/popup-component/popup-component";
import Menus from "./components/menus-component/menus-component";


function WebsiteRoutes() {
    const [popupVisible, setPopupVisible] = useState(false);

    const handlePopupVisibility = () => {
        setPopupVisible(!popupVisible);
    }
    
    
    return (
        <div id="website_bloc">
            <div id="content_bloc">

                { <HeaderComponent handlePopupVisibility={handlePopupVisibility} /> }

                <div id="main_bloc">
                    
                    { popupVisible && 
                    <Popup handlePopupVisibility={handlePopupVisibility}>
                        <Menus />
                    </Popup> }

                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="*" element={<>
                            <h1>page website error 404</h1> 
                            <NavLink to="../">retour</NavLink> |
                            <NavLink to="/">home</NavLink>
                        </>} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default WebsiteRoutes;