import { useState, useEffect } from "react";

// CRUD
import { menuCreate, menuUpdate } from "../menus-page-script";



export function NewMenu(props) {
    let modelMenu = {
        menu_name: "",
    }
    const [ newMenu, setNewMenu ] = useState(modelMenu)
    const [ error, setError ] = useState(null)

    const handleChange = (e) => {
        setNewMenu({...newMenu, [e.target.name]: e.target.value.toLowerCase()})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (newMenu.menu_name == "") {
            return setError("Vous devez remplir les champs obligatoires")
        }else{
            await menuCreate(newMenu)
            .then((res) => {
                console.log("res : ", res);
                setError("Menu créé")
                props.selectList()
                let timer = setTimeout(() => {
                    setError(null)
                    // props.closePopup()
                    setNewMenu(modelMenu)
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
            <input type="text" placeholder="menu name" name="menu_name" value={newMenu.menu_name} onChange={handleChange} />
        </form>
        <button className="button" onClick={handleSubmit}>Créer</button>
        </>
    )
}




export function UpdateMenu(props) {
    const [ updateMenu, setUpdateMenu ] = useState({
        menu_name: "",
    })
    const [ error, setError ] = useState(null)

    const handleChange = (e) => {
        setUpdateMenu({...updateMenu, [e.target.name]: e.target.value.toLowerCase()})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (updateMenu.menu_name == "") {
            return setError("Vous devez remplir les champs obligatoires")
        }else{
            await menuUpdate(props.menu._id, updateMenu)
            .then((res) => {
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