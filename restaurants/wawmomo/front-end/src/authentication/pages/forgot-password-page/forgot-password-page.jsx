// Dependencies
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

// Scrypts
import { forgotPassword } from "../../scripts/authentication-scripts";


function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [msgErrorUsername, setMsgErrorUsername] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        forgotPassword({email})
        .then((res) => {
            setMsgErrorUsername(res.message)
        })
        .catch((err) => {
            console.error("err : ", err.message);
            setMsgErrorUsername(err.message)
        });
    }

    useEffect(()=>{
        msgErrorUsername != false && setMsgErrorUsername(false)
    }, [email])

    return (

        <div className="loginFormContainer">
            <h2>Récupérer mot de passe</h2>
            <form onSubmit={handleSubmit} className="form">
                <div className="formGroup">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input"
                    required
                />
                </div>
                <button type="submit" className="button">Se connecter</button>
                {msgErrorUsername && <p className="msgErr">{msgErrorUsername}</p>}
            </form>
            <div>
                <p className="smallTxt">
                    {/* Mot de passe oublié ? <NavLink to="/dash/auth/forgot-password">Cliquez ici</NavLink> */}
                    voulait vous connecter ? <NavLink to="/dash/auth/login">Cliquez ici</NavLink>
                </p>
            </div>
        </div>
    )
}

export default ForgotPasswordPage;