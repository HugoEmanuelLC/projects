import { NavLink } from "react-router-dom";


function ErrorPage() {
    return (
        <section>
            <h1>Error 404</h1>
            <NavLink to="../">retour</NavLink> |
        </section>
    );
}

export default ErrorPage;