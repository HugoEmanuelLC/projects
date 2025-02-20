import { Route, Routes, NavLink } from 'react-router-dom';

import './styles/index.css'
import Home from './pages/home';


function WebsiteRoutes() {
    return (
        <div id="global_bloc">

            {/* <Navbar /> */}

            <div id="main_bloc">

                {/* <Header /> */}

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
    )
}

export default WebsiteRoutes;