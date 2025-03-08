import { useState, useEffect } from "react";

import { timetableSelect } from "../../../authentication/scripts/authentication-scripts";

import Popup from "../../components/popup-component/popup-component";
import { UpdateTimetable } from "./components/edite-popup-component";

function TimetablePage() {
    const [ loading, setLoading ] = useState(true)
    const [ listtimetableUpdate, setListTimetableUpdate ] = useState([])

    const [ updateTimetable, setUpdateTimetable ] = useState(null)

    const selectTimetables = async () => {
        await timetableSelect("auth")
        .then((res) => {
            setListTimetableUpdate(res)
            console.log("Timetables : ", res);
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
        }, 2000)
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
                                listtimetableUpdate !== null ?
                                <></>
                                :
                                <tr>
                                <td>Lundi:</td>
                                <td>08:00</td>
                                <td>18:00</td>
                                <td className="actions">
                                    <button onClick={()=>setUpdateTimetable([true])} ><i className='bx bx-edit-alt'></i></button>
                                </td>
                            </tr>
                            }                        
                        </tbody>
                    </table>

                    {
                        updateTimetable !== null && 
                        <Popup
                            closePopup={()=>setUpdateTimetable(null)}
                        >
                            <h1>
                                Update Timetable
                            </h1>
                            <UpdateTimetable 
                                timetable={{day:"listtimetableUpdate"}}
                                selectTimetables={selectTimetables}
                                closePopup={()=>setUpdateTimetable(null)}
                            />
                        </Popup>
                    }
                </div>
                </>
            }
        </section>
    );    
}

export default TimetablePage;