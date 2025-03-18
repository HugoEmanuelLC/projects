// Dependencies
import { Route, Routes } from 'react-router-dom'

// Pages
// import Home from '/pages/home-page/home-page'

// Assets
import logoCD from '/assets/logoCD.png'

// Styles
import './styles/index.css'



function WebsiteRoutes() {
    return (
        <>
            <Routes>
                <Route path="" element={<img src={logoCD} />} />
            </Routes>
        </>
    );
}

export default WebsiteRoutes