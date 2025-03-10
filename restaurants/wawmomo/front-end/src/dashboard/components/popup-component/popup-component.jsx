import { useState, useEffect } from 'react';

import {NewMenu} from '../../pages/menus-page/components/edite-menu-component';
import {NewProduct} from '../../pages/menus-page/components/edite-product-component';
import {NewTimetableDay} from '../../pages/timetable-page/components/edite-timetable-component';


function Popup(props) {

    const [ loading, setLoading ] = useState(true)

    const handleLoading = (close=null) => {
        let load = setTimeout(() => {
            setLoading(false)
        }, 500)
        return () => clearTimeout(load)
    }

    useEffect(() => {
        loading == true && handleLoading()
    }, [loading])

    return (
        <div className="popup">
            <div className="popup_content">
                {props.children}
                <button className="close" onClick={props.closePopup}>Fermer</button>
            </div>
        </div>
    )
}

export default Popup;


export function ConfimationDelete(props) {
    const [ msg, setMsg ] = useState(null)

    const handleDelete = async () => {
        await props.fnc(props.datas.id)
        .then((res) => {
            props.selectDatas()
            setMsg(props.msg)
            let timer = setTimeout(() => {
                setMsg(null)
                props.closePopup()
            }, 1000)
            return () => clearTimeout(timer)
        })
        .catch((err) => {
            console.error("Err : ", err);
        });
    }

    return (
        <>
        {
            msg == null ? 
            <h2>Confirmer la suppression de {props.datas.name.toUpperCase()}</h2> : 
            <h2>{msg}</h2>
        }
        {msg == null && <button className="button" onClick={handleDelete}>Supprimer</button>}
        </>
    )
}



