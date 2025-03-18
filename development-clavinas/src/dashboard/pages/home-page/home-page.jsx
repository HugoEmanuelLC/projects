// Dependencies:
import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';

// Components
import TestComponent from '../../components/test-component/test-component';


function HomePage() {
    const [ components, setComponents ] = useState([])
    const active = useRef(null)

    const handleObjectIsActive = (e) => {
        let object = active.current

        if (object.classList.contains("inactive")) {
            object.classList.remove("inactive")
            object.classList.add("active")
        }
        else{
            object.classList.remove("active")
            object.classList.add("inactive")
        }
    }

    return (
        <section id="home_page">
            <div className="scene2_3d">
                <div className="bloc_objects ">
                    {/* <div className="object active object1" >
                        <h1 className="btn">about</h1>
                    </div>
                    <div className="object active object2" ></div>
                    <div className="object active object3" ></div> */}
                    <TestComponent><h1>test</h1></TestComponent>
                </div>
            </div>

            <div className="testBox">
                <div className="testContent">
                    <div  >
                        <a ref={active} onClick={handleObjectIsActive} className="bloc inactive" href="#">link test</a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HomePage;