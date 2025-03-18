// Dependencies:
import { useState, useEffect, useRef } from 'react';



function TestComponent({children}) {
    const cible = useRef(null);

    const handleObjectIsActive = (e) => {
        let object = cible.current

        if (object.classList.contains("active")) {
            object.classList.remove("active")
            object.classList.add("inactive")
        }
        if (e.target.tagName == "BUTTON") {
            object.classList.add("active")
            object.classList.remove("inactive")
        }
    }

    return (
        <div ref={cible} onClick={handleObjectIsActive} className="object active object2" >
            <h1 className='titre'>about</h1>
            <div className="content">
                <div className="">
                    <button onClick={handleObjectIsActive}>fermer</ button>
                </div>

                {children}
            </div>
        </div>
    )
}

export default TestComponent;