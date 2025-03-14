import React, { useEffect, useState } from 'react' 

// CRUD
import { timetableDayUpdate, timetableCommentUpdate, timetableDayCreate } from '../timetable-script'


export function NewTimetableDay(props){
    let modelTimetable = {
        day_name: "",
        open: "",
        close: ""
    }
    const [ newTimetable, setNewTimetable ] = useState(modelTimetable)
    const [ error, setError ] = useState(null)

    const handleChange = (e) => {
        setNewTimetable({...newTimetable, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (newTimetable.day_name == "" || newTimetable.open == "" || newTimetable.close == "") {
            return setError("Vous devez remplir les champs obligatoires")
        }else{
            await timetableDayCreate(props.parent_id, newTimetable)
            .then((res) => {
                console.log("res : ", res);
                setError("Horaire créé")
                props.selectList()
                let timer = setTimeout(() => {
                    setError(null)
                    // props.closePopup()
                    setNewTimetable({day_name: "", open: newTimetable.open, close: newTimetable.close})
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
    }, [newTimetable])

    return (
        <>
        <span>{error}</span>
        <form >
            <h2>Création d'un nouvel horaire</h2>
            <input type="text" placeholder="day name" name="day_name" value={newTimetable.day_name} onChange={handleChange} />
            <input type="time" name="open" value={newTimetable.open} onChange={handleChange} />
            <input type="time" name="close" value={newTimetable.close} onChange={handleChange} />
        </form>
        <button className="button" onClick={handleSubmit}>Créer</button>
        </>
    )
}

// export function UpdateTimetable(props){

//     return (
//         props.boolean == "day" ?
//         <UpdateTimetableDay timetable={timetable} selectTimetables={props.selectTimetables} closePopup={props.closePopup} /> :
//         <UpdateTimetableComment timetable={timetable} selectTimetables={props.selectTimetables} closePopup={props.closePopup} />
//     )
// }



export function UpdateTimetableDay(props){
    const [ timetable, setTimetable ] = useState(props.timetable)
    const [ error, setError ] = useState(null)

    const handleUpdate = async () => {
        if (
            timetable.open == props.timetable.open && 
            timetable.close == props.timetable.close &&
            timetable.day_name == props.timetable.day_name
        ) {
            return setError("Vous n'avez rien modifié")
        }else{
            await timetableDayUpdate(timetable.hours_id, timetable) 
            .then((res) => {
                props.selectTimetables()
                setError("Horaire modifié")
                let timer = setTimeout(() => {
                    setError(null)
                    props.closePopup()
                }, 1000)
                return () => clearTimeout(timer)
            })
            .catch((err) => {
                console.error("Err : ", err);
            });
        }
    }

    useEffect(() => {
        setError(null)
    }, [timetable])

    return (
        <>
        <span>{error}</span>
        <form >
            <h2>Modification des horaires pour {props.timetable.day_name.toUpperCase()}</h2>
            <input type="text" name="day_name" value={timetable.day_name} onChange={(e)=>setTimetable({...timetable, day_name: e.target.value})} />
            <input type="time" name="open" value={timetable.open} onChange={(e)=>setTimetable({...timetable, open: e.target.value})} />
            <input type="time" name="close" value={timetable.close} onChange={(e)=>setTimetable({...timetable, close: e.target.value})} />
        </form>
        <button className="button" onClick={handleUpdate}>Modifier</button>
        </>
    )
}






export function UpdateTimetableComment(props){
    const [ timetable, setTimetable ] = useState(props.timetable)
    const [ error, setError ] = useState(null)

    const handleUpdate = async () => {
        if ( timetable.comment == props.timetable.comment ) {
            return setError("Vous n'avez rien modifié")
        }else{
            await timetableCommentUpdate(timetable.timetable_id, timetable)
            .then((res) => {
                props.selectTimetables()
                setError("Commentaire modifié")
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
        console.log("timetable : ");
        console.log(timetable);
    }, [timetable])

    return (
        <>
        <span>{error}</span>
        <form >
            <h2>Modification des horaires pour: </h2>
            <h2>Commentaire</h2>
            <input type="text" placeholder="Commentaire" name="comment" value={timetable.comment} onChange={(e)=>setTimetable({...timetable, comment: e.target.value})} />
        </form>
        <button className="button" onClick={handleUpdate}>Modifier</button>
        </>
    )
}