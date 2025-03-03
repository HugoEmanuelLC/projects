// Dependencies
import { useEffect, useState } from "react";
// Scrypts
import { forgotPassword } from "../scripts/authentication-scripts";


function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [msgErrorUsername, setMsgErrorUsername] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        forgotPassword({email})
        .then((res) => {
            console.log("res : ", res);
            // setEmail("");
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
        <div id="authenticationPage">
            <h2>Forgot Password</h2>
            {msgErrorUsername && <p className="msgErr">{msgErrorUsername}</p>}
            <form>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" name="email" 
                    value={email} onChange={(e) => setEmail(e.target.value)} />

                <button type="submit" onClick={handleClick}>Recover Password</button>
            </form>
        </div>
    )
}

export default ForgotPasswordPage;