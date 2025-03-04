import { useState, useEffect } from "react";

import { menusSelect, productsSelect, productUpdate, productDelete, menuCreate, productCreate } from "../../../../authentication/scripts/authentication-scripts";



function NewMenu(props) {
    const [ newMenu, setNewMenu ] = useState("")
    const [ error, setError ] = useState(null)

    const handleChange = (e) => {
        setNewMenu(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (newMenu == "") {
            return setError("Vous devez remplir les champs obligatoires")
        }else{
            await menuCreate("auth", [newMenu])
            .then((res) => {
                console.log("res : ", res);
                setError("Menu créé")
                props.selectListMenus()
                let timer = setTimeout(() => {
                    setError(null)
                    props.closePopup()
                }, 1000)
                return () => clearTimeout(timer)
            })
            .catch((err) => {
                setError("Erreur lors de la création")
                console.error("Err : ", err);
            });
        }
    }

    useEffect(() => {
        setError(null)
    }, [newMenu])

    return (
        <>
        <span>{error}</span>
        <form >
            <h2>Création d'un nouveau menu</h2>
            <input type="text" placeholder="menu name" value={newMenu} onChange={handleChange} />
        </form>
        <button className="button" onClick={handleSubmit}>Créer</button>
        </>
    )
}


export default NewMenu;