import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';

import AppContext from '../../hooks/app-context';

function Home() {
    const app = useContext(AppContext);

    const handleCheckAuthFnc = () => {
        app.checkAuthFnc();
    }

    return (
        <>
        <h1>page website</h1>
        <nav>
            <NavLink to="">website</NavLink> |
            <NavLink to="auth/login">login form</NavLink> |
            <NavLink to="dash">dash</NavLink> 
        </nav>
        </>
    )
}

export default Home;