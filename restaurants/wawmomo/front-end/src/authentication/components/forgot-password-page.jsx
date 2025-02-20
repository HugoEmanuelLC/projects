// Dependencies
import { useEffect, useState } from "react";
// Scrypts
import { forgotPassword } from "../scripts/authentication-scripts";


function ForgotPasswordPage() {
    const [username, setUsername] = useState("");

    const handleClick = (e) => {
        e.preventDefault();
        forgotPassword({username})
        .then((res) => {
            console.log("res : ", res);
            setUsername("");
            alert("Recover Password Success ! " + res.message)
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
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" 
                    value={username} onChange={(e) => setUsername(e.target.value)} />

                <button type="submit" onClick={handleClick}>Recover Password</button>
            </form>
        </div>
    )
}

export default ForgotPasswordPage;