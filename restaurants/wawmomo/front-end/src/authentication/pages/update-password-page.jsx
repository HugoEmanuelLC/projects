// Dependencies
import { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";

// Scrypts
import { updatePassword } from "../scripts/authentication-scripts";


function UpdatePasswordPage(props) {
    const [msgErrorUsername, setMsgErrorUsername] = useState(false);
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");
    // const [msgErrorPassword, setMsgErrorPassword] = useState(null);
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== repassword){
            console.log("passwords not match : ", password, password.length, " : "
            , repassword, repassword.length);
            setMsgErrorUsername("passwords not match")
            return
        }else{
            let urlParams = new URLSearchParams(window.location.search);
            let token = urlParams.get('secret');
            await updatePassword({password, token})
            .then((res) => {
                setMsgErrorUsername(res.message)
            })
            .catch((err) => {
                console.log("err : ", err);
                setMsgErrorUsername(err.message)
            });
        }
    };

    useEffect(()=>{
        msgErrorUsername != false && setMsgErrorUsername(false)
    }, [password, repassword])

    return (
        <div className="loginFormContainer">
            <h2>Update Password</h2>
            <form onSubmit={handleSubmit} className="form">
                <div className="formGroup">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" className="input"
                    value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className="formGroup">
                    <label htmlFor="repassword">Re-password</label>
                    <input type="password" id="repassword" name="repassword" className="input"
                    value={repassword} onChange={(e) => setRepassword(e.target.value)} />
                </div>

                <button type="submit" className="button">Modifier</button>
                {msgErrorUsername && <p className="msgErr">{msgErrorUsername}</p>}
            </form>
            <div>
                <p className="smallTxt">
                    {/* Mot de passe oublié ? <NavLink to="/dash/auth/forgot-password">Cliquez ici</NavLink> */}
                    voulait vous connecter ? <NavLink to="/dash/auth/login">Cliquez ici</NavLink>
                </p>
            </div>
        </div>
    );
}

export default UpdatePasswordPage;