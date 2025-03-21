import { useState, useEffect } from "react";

import { 
    timetableSelect, 
    timetableDayDelete, 
    timetableCommentDelete, 
    timetableDayCreate 
} from "./timetable-script";

import Popup, { ConfimationDelete } from "../../components/popup-component/popup-component";
import { UpdateTimetableDay, UpdateTimetableComment, NewTimetableDay } from "./components/edite-timetable-component";

function TimetablePage() {
    const [ loading, setLoading ] = useState(true)
    const [ listTimetableUpdate, setListTimetableUpdate ] = useState([])

    const [ createNewElementPopup, setCreateNewElementPopup ] = useState(null)
    const [ deliteElementFromDB, setDeliteElementFromDB ] = useState(null)

    const [ updateTimetableElement, setUpdateTimetableElement ] = useState(null)
    const [ updateTimetableComment, setUpdateTimetableComment ] = useState(null)
    const [ boolean, setBoolean ] = useState(null)

    const selectTimetables = async () => {
        await timetableSelect("auth")
        .then((res) => {
            setListTimetableUpdate(res)
        })
        .catch((err) => {
            setListTimetableUpdate([])
            console.error("Err : ", err);
        });
    }

    const handleLoading = () => {
        selectTimetables()
        let load = setTimeout(() => {
            setLoading(false)
        }, 500)
        return () => clearTimeout(load)
    }   

    useEffect(() => {
        loading == true && handleLoading()
    }, [loading])

    return (
        <section className="box_content_settings">
            {
                loading ? <h1>...</h1> :
                <>
                <div className="list_head_links">
                    <h3> Horaires </h3>
                </div>
                <div className="btn_new_add" onClick={()=>setCreateNewElementPopup(true)}>Ajouter menu</div>
                <div className="list_datas">
                    <table>
                        <thead>
                            <tr>
                                <th>Jour</th>
                                <th>ouvre</th>
                                <th>ferme</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                listTimetableUpdate.length > 0 ? listTimetableUpdate.map((day, index)=>{
                                    return (
                                        day.day_name !== null &&
                                        <tr key={index}>
                                            <td>{day.day_name}</td>
                                            <td>{day.open}</td>
                                            <td>{day.close}</td>
                                            <td className="actions">
                                                <button onClick={()=>{ setBoolean("day"); setDeliteElementFromDB(day) }}><i className='bx bx-trash'></i></button>
                                                <button onClick={()=>{ setBoolean("day"); setUpdateTimetableElement(day) }}><i className='bx bx-edit-alt'></i></button>
                                            </td>
                                        </tr>
                                    )
                                }) : listTimetableUpdate == null ? null :
                                <tr>
                                    <td colSpan="4"> No Timetable </td>
                                </tr>
                            }       

                            {
                                listTimetableUpdate.length > 0 && listTimetableUpdate[0].comment !== null && 
                                <tr>
                                    <td>comment</td>
                                    <td colSpan="2">{listTimetableUpdate[0].comment}</td>
                                    <td className="actions">
                                        <button onClick={()=>{ setBoolean("comment"); setDeliteElementFromDB(listTimetableUpdate[0]) }}><i className='bx bx-trash'></i></button>
                                        <button onClick={()=>{ setBoolean("comment"); setUpdateTimetableElement(listTimetableUpdate[0])}}><i className='bx bx-edit-alt'></i></button>
                                    </td>
                                </tr> 
                            }                 
                        </tbody>
                    </table>

                    {
                        updateTimetableElement !== null && 
                        <Popup
                            closePopup={()=>setUpdateTimetableElement(null)}
                        >
                        {
                            boolean == "day" ?
                            <UpdateTimetableDay 
                                timetable={updateTimetableElement} 
                                selectTimetables={selectTimetables} 
                                closePopup={()=>setUpdateTimetableElement(null)} /> :
                            boolean == "comment" &&
                            <UpdateTimetableComment 
                                timetable={updateTimetableElement} 
                                selectTimetables={selectTimetables} 
                                closePopup={()=>setUpdateTimetableElement(null)} />
                        }
                        </Popup>
                    }

                    {
                        deliteElementFromDB !== null &&
                        <Popup
                            closePopup={()=>setDeliteElementFromDB(null)}
                        >
                            {
                                boolean == "day" ?
                                <ConfimationDelete 
                                    datas={
                                        {
                                            id: deliteElementFromDB.hours_id,
                                            name: deliteElementFromDB.day_name
                                        }
                                    }
                                    selectDatas={selectTimetables}
                                    msg="Horaire supprimé"
                                    closePopup={()=>setDeliteElementFromDB(null)}
                                    fnc={timetableDayDelete}
                                /> :
                                boolean == "comment" &&
                                <ConfimationDelete 
                                    datas={
                                        {
                                            id: deliteElementFromDB.timetable_id,
                                            name: "commentaire"
                                        }
                                    }
                                    selectDatas={selectTimetables}
                                    msg="Commentaire supprimé"
                                    closePopup={()=>setDeliteElementFromDB(null)}
                                    fnc={timetableCommentDelete}
                                />
                            }
                        </Popup>
                    }

                    {
                        createNewElementPopup !== null &&
                        <Popup
                            closePopup={()=>setCreateNewElementPopup(null)}
                        >
                            {
                                <NewTimetableDay 
                                    selectList={selectTimetables} 
                                    parent_id={listTimetableUpdate[0].timetable_id}
                                    closePopup={()=>setCreateNewElementPopup(null)} />
                            }
                        </Popup>
                    }
                </div>
                </>
            }
        </section>
    );    
}

export default TimetablePage;