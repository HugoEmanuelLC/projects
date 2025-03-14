// Components
import BtnsComponent from '../btns-component/btns-component';


function HeaderComponent(props) {
    return (
        <header>
            <div className="header__container container">
                <span>wawmomo</span>
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