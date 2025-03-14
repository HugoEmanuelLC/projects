// Dependencies
import { useEffect, useState } from "react";

// Scripts
// import { menusList, productsListFromMenu } from "./popup-component-script";

function Popup(props){


    return (
        <section id="popup_component" className="popup_visible">
            <div className="popup_content container">
                <button className="btn_close" onClick={props.handlePopupVisibility}>X</button>
                {props.children && props.children}
            </div>
        </section>
    )
}

export default Popup;