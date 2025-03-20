import React, { useRef, useContext } from 'react';
import { NavLink } from 'react-router-dom';

import DashContext from '../../hooks/dash-context';


function NavbarComponent(props) {
    // START NAVBAR OPEN AND CLOSE
    const navBar = useRef()
    const btn_open = useRef()
    const btn_close = useRef()

    const openAndCloseNavBar = () => {
        navBar.current.classList.toggle('close_nav')
        if (navBar.current.classList.contains('close_nav')) {
            btn_open.current.style.display = 'block'
            btn_close.current.style.display = 'none'
        } else {
            btn_open.current.style.display = 'none'
            btn_close.current.style.display = 'block'
        }
    }

    const handleVerifUrl = (url) => {
        let pathname = window.location.pathname
        if (pathname !== url) {
            openAndCloseNavBar()
        }
    }
    // END NAVBAR OPEN AND CLOSE

    // CLOSE SESSION
    const { handleCloseSession } = useContext(DashContext)

    return (
        <>
        <div className="box_btns_navbar displayNone" onClick={openAndCloseNavBar}>
            <i ref={btn_open} className='btn_open bx bx-menu'></i>
            <i ref={btn_close} className='btn_close bx bx-x'></i>
        </div>
        
        <nav className='navbar close_nav' ref={navBar}>
            <div className="content">
                <h3>Admin</h3>
                <ul>
                    {/* <li><NavLink onClick={()=>handleVerifUrl("/dash")} to="/dash" end>home</NavLink></li> */}
                    <li><NavLink onClick={()=>handleVerifUrl("/dash/menus")} to="/dash/menus" end>Menus</NavLink></li>
                    <li><NavLink onClick={()=>handleVerifUrl("/dash/produits")} to="/dash/produits" end>Produits</NavLink></li>
                    <li><NavLink onClick={()=>handleVerifUrl("/dash/horaires")} to="/dash/horaires" end>horaires</NavLink></li>
                    <li><NavLink onClick={()=>handleVerifUrl("/dash/contacts")} to="/dash/contacts" end>contacts</NavLink></li>
                    <li><NavLink onClick={()=>handleVerifUrl("/")} to="/">website</NavLink></li>
                </ul>
                <button onClick={handleCloseSession}>logout</button>
            </div>
        </nav>
        </>
    );
}

export default NavbarComponent;