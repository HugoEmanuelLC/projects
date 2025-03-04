import { useState, useEffect } from "react";

import { menuCreate, menuUpdate } from "../../../../authentication/scripts/authentication-scripts";



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



export function UpdateMenu(props) {
    const [ updateMenu, setUpdateMenu ] = useState({
        menu_name: "",
    })
    const [ error, setError ] = useState(null)

    const handleChange = (e) => {
        setUpdateMenu({...updateMenu, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (updateMenu.menu_name == "") {
            return setError("Vous devez remplir les champs obligatoires")
        }else{
            await menuUpdate("auth", props.menu._id, updateMenu)
            .then((res) => {
                console.log("res : ", res);
                setError("Menu modifié")
                props.selectListMenus()
                let timer = setTimeout(() => {
                    setError(null)
                    props.closePopup()
                }, 1000)
                return () => clearTimeout(timer)
            })
            .catch((err) => {
                setError("Erreur lors de la modification")
                console.error("Err : ", err);
            });
        }
    }

    useEffect(() => {
        setError(null)
        console.log("props.data : ");
        console.log(props.menu);
    }, [updateMenu])

    return (
        <>
        <span>{error}</span>
        <form >
            <h2>Modification du menu: {props.menu.menu_name.toUpperCase()}</h2>
            <input type="text" placeholder="menu name" name="menu_name" value={updateMenu.menu_name} onChange={handleChange} />
        </form>
        <button className="button" onClick={handleSubmit}>Modifier</button>
        </>
    )
}