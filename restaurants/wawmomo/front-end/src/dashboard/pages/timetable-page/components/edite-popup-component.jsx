import React, { useState } from 'react' 

export function UpdateTimetable(props){
    const [ timetable, setTimetable ] = useState(props.timetable)
    const [ msg, setMsg ] = useState(null)

    const handleUpdate = async () => {
        await props.fnc("auth", timetable)
        .then((res) => {
            // props.selectTimetables()
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
            <h2>Confirmer la modification de {timetable.day.toUpperCase()}</h2> : 
            <h2>{msg}</h2>
        }
        {msg == null && <button className="button" onClick={handleUpdate}>Modifier</button>}
        </>
    )
}