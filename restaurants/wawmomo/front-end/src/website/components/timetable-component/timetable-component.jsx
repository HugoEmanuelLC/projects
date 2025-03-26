// Dependencies
import { useEffect, useState } from "react"

// Script
import { timetableList } from "./timetable-component-script"


function TimetableComponent() {
    const [timetable, setTimetable] = useState([])

    const handleTimetableSelect = async () => {
        await timetableList()
        .then((res) => {
            setTimetable(res)
        })
        .catch((err) => {
            console.error("Err : ", err);
        });
    }

    useEffect(() => {
        handleTimetableSelect()
    }, [])
    
    return (
        <section id="timetable">
            <h2>Horaires</h2>
            <div className="box ">
                <table>
                    {/* <thead>
                        <tr>
                            <th>Day</th>
                            <th>Time</th>
                            <th>Class</th>
                        </tr>
                    </thead> */}
                    <tbody>
                        {
                            timetable?.length > 0 && timetable.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.day_name}</td>

                                        <td>{
                                            item.open == '00:00' || item.open == '' && 
                                            item.close == '00:00' || item.close == '' ? 
                                                'fermé' : item.open.replace(':', 'h')
                                        }</td>

                                        <td>{
                                            item.open == '00:00' || item.open == '' && 
                                            item.close == '00:00' || item.close == '' ? 
                                            '' : item.close.replace(':', 'h')
                                        }</td>
                                    </tr>
                                )
                            })
                        }
                        {
                            timetable?.length > 0 && <tr><td className="comment" colSpan="3">{
                                timetable[0].comment
                            }</td></tr>
                        }
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default TimetableComponent