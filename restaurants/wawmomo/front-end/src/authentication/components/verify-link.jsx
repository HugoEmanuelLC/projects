// Dependencies
import {useEffect, useState} from 'react';
// Scrypts
import {verifyLink} from '../scripts/authentication-scripts';

function VerifyLink() {
    const [decounte, setDecounte] = useState(3);
    const [msg, setMsg] = useState(null);

    const verifParamsOfUrl = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('secret');
        return token;
    }

    useEffect(() => {
        // si le compte à rebours est terminé, rediriger vers la page de connexion
        if (decounte <= 0) {
            verifyLink(verifParamsOfUrl())
                .then((res) => {
                    setMsg(`
                        Votre compte est bien vérifié, 
                        vous allez être redirigé vers la page de connexion...    
                    `);
                    let timer = setTimeout(() => {
                        window.location.href = "/login";
                    }, 3000);
                    return () => clearTimeout(timer);
                })
                .catch((err) => {
                    console.log("err : ");
                    console.log(err);
                    setMsg(`
                        Impossible de vérifier votre compte, 
                        veuillez cliquer sur le lien de vérification dans votre boîte mail...
                    `)
                });
        }else{
            const timer = setInterval(() => {
                setDecounte(decounte - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [decounte]);

    return (
        <div>
            <p>
                {decounte > 0 ? `Vérification en cours dans ${decounte} secondes` : msg}
            </p>
        </div>
    );
}

export default VerifyLink;