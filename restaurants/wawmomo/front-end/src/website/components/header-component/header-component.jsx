// Dependencies
import React, { useRef, useEffect } from 'react';

// Components
import BtnsComponent from '../btns-component/btns-component';


function HeaderComponent(props) {
    const ul_menu_scroll = useRef(null);

    const handleMenuScroll = () => {
        // if (window.scrollY > 100) {
        //     ul_menu_scroll.current.classList.add('active');
        // } else {
        //     ul_menu_scroll.current.classList.remove('active');
        // }

        if (ul_menu_scroll.current.classList.contains('inactive')) {
            ul_menu_scroll.current.classList.remove('inactive');
            ul_menu_scroll.current.classList.add('active');
        }else if (ul_menu_scroll.current.classList.contains('active')) {
            ul_menu_scroll.current.classList.remove('active');
            ul_menu_scroll.current.classList.add('inactive');
        }
    }

    useEffect(() => {}, []);

    return (
        <header>
            <div className="header__container container">
                <span className='logo'>
                    <a href="#">waw<br />momo</a>
                </span>
                
                <div className="muneScroll">
                    <div className="btnOpen" onClick={handleMenuScroll}>
                        <i className='bx bx-menu-alt-left'></i>
                    </div>

                    <ul ref={ul_menu_scroll} className='inactive'>
                        <div className="btnClose">
                            <i className='bx bx-x' onClick={handleMenuScroll}></i>
                        </div>
                        {/* <li>
                            <a href="#">home</a>
                        </li> */}
                        <li>
                            <a href="#timetable">horaires</a>
                        </li>
                        <li>
                            <a href="#location">contact</a>
                        </li>
                    </ul>
                </div>

                <nav>
                    <ul>
                        <li>
                            <BtnsComponent>
                                <button onClick={props.handlePopupVisibility}>menus</button>
                            </BtnsComponent>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default HeaderComponent;