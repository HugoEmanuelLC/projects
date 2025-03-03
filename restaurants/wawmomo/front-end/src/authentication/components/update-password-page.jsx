// Dependencies
import { useEffect, useState, useContext } from "react";
// Scrypts
import { updatePassword } from "../scripts/authentication-scripts";
// Hooks Parent from App.jsx
import AppContext from "../../hooks/app-context";


function UpdatePasswordPage(props) {
    const [username, setUsername] = useState("");
    const [msgErrorUsername, setMsgErrorUsername] = useState(false);
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");
    // const [msgErrorPassword, setMsgErrorPassword] = useState(null);

    // context from App.jsx
    const { setCheckAuth } = useContext(AppContext);
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== repassword){
            setMsgErrorUsername("passwords do not match")
            return
        }else{
            let urlParams = new URLSearchParams(window.location.search);
            let token = urlParams.get('secret');
            await updatePassword({password, token})
            .then((res) => {
                // setPassword("");
                // setRepassword("");
                // context from App.jsx
                // setCheckAuth(res);
                // props.setLoading(true)
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
        <div id="authenticationPage">
            <h2>Update Password</h2>
            {msgErrorUsername && <p className="msgErr">{msgErrorUsername}</p>}
            <form >
            <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" 
                    value={password} onChange={(e) => setPassword(e.target.value)} />

                <label htmlFor="repassword">Re-password</label>
                <input type="password" id="repassword" name="repassword" 
                    value={repassword} onChange={(e) => setRepassword(e.target.value)} />

                <button type="submit" onClick={(e) => handleSubmit(e)}>Login</button>
            </form>
        </div>
    );
}

export default UpdatePasswordPage;