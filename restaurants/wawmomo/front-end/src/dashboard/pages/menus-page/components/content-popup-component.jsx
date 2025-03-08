import { useState, useEffect } from "react";

import NewMenu from "./edite-menu-component";
import NewProduct from "./edite-product-component";


export function CreateNewElement(props) {

    return (
        props.createNewElementPopup == "menu" ? 
            <NewMenu selectListMenus={props.selectListMenus} closePopup={props.closePopup} /> 
        : props.createNewElementPopup == "product" ?
            <NewProduct selectProducts={props.selectProducts} menu_id={props.menu_id} closePopup={props.closePopup} /> :
        <h1>...</h1>
    )
}




