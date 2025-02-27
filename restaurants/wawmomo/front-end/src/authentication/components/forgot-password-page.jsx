// Dependencies
import { useEffect, useState } from "react";
// Scrypts
import { forgotPassword } from "../scripts/authentication-scripts";


function ForgotPasswordPage() {
    const [email, setEmail] = useState("");

    const handleClick = (e) => {
        e.preventDefault();
        forgotPassword({email})
        .then((res) => {
            console.log("res : ", res);
            setEmail("");
            alert(res.message)
        })
        .catch((err) => {
            console.error("err : ", err.message);
            alert(err.message)
        });
    }

    useEffect(() => {
        // console.log(window.location.origin+"/recover-password");
        console.log(window.location.href);
    }, []);

    return (
        <div id="forgotPasswordPage">
            <h1>Forgot password page</h1>
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