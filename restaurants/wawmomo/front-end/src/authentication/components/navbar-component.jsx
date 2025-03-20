// Dependencies
import { NavLink } from "react-router-dom";


function NavbarComponent(){
    return (
        <nav>
            <NavLink to="/" >website</NavLink> | 
            <NavLink to="/dash/auth/login" >login</NavLink> | 
            <NavLink to="/dash/auth/forgot-password" >forgot password</NavLink> |
            <NavLink to="/dash/auth/testerror" >testerror</NavLink>
        </nav>
    )
}

export default NavbarComponent;