import { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import AppContext from '../../../hooks/app-context';


function HeaderComponent() {
    const { checkAuth } = useContext(AppContext);

    return (
        <header>
            <div className="content">
                <NavLink to="/dash/user-page">
                    <span className="picture_user"></span>
                </NavLink>
                <span className="nom_user">
                    {checkAuth && checkAuth?.auth.username ? checkAuth?.auth.username : "admin admin"}
                </span>
            </div>
        </header>
    );
}

export default HeaderComponent;