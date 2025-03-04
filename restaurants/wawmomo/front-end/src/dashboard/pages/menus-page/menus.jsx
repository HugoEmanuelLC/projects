import { useState, useEffect } from "react";

import { menusSelect } from "../../../authentication/scripts/authentication-scripts";

import Popup, {
    CreateNewElement,
} from "./components/popup-component";


function MenusPage() {
    const [ listMenus, setListMenus ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ selectedMenu, setSelectedMenu ] = useState(null)

    const [ updateMenuPopup, setUpdateMenuPopup] = useState(null)
    const [ delitedMenuPopup, setDelitedMenuPopup ] = useState(null)

    const [ createNewElementPopup, setCreateNewElementPopup ] = useState(null)
    


    const selectListMenus = async () => {
        await menusSelect("auth")
        .then((res) => {
            console.log("res : ", res);
            setListMenus(res)
        })
        .catch((err) => {
            console.error("Err : ", err);
        });
    }

    const handleLoading = (close=null) => {
        selectListMenus()
        let load = setTimeout(() => {
            setLoading(false)
        }, 500)
        return () => clearTimeout(load)
    }

    useEffect(() => {
        loading == true && handleLoading()
    }, [loading])

    // return (
    //     <section className="menus" >
    //         <div className="btnPlus" onClick={()=>setCreateNewElementPopup("menu")}>+</div>
    //         {
    //             loading ? <h1>...</h1> : 
    //             <div className="list_menus">
    //                 <ul>
    //                 {
    //                     listMenus.map((menu, index) => {
    //                         return (
    //                             <li key={index} onClick={()=>setSelectedMenu(menu._id)}>
    //                                 {menu.menu_name} 
    //                                 {selectedMenu == menu._id && <hr />}
    //                             </li>
    //                         )
    //                     })
    //                 }
    //                 </ul>
    //             </div>
    //         }

    //         {/* <ProductsComponent menu_id={selectedMenu} />

    //         {
    //             createNewElementPopup !== null &&
    //             <Popup
    //                 closePopup={()=>setCreateNewElementPopup(null)}
    //             >
    //                 <CreateNewElement 
    //                     createNewElementPopup={createNewElementPopup}
    //                     selectListMenus={selectListMenus}
    //                     closePopup={()=>setCreateNewElementPopup(null)}
    //                 />
    //             </Popup>
    //         } */}
    //     </section>
    // )


    return (
        <section className="menus">
            {
                loading ? <h1>...</h1> : 
                <div className="list_products">
                    <div className="btnPlus" onClick={()=>setCreateNewElementPopup("menu")}>+</div>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Image</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listMenus?.length > 0 ? listMenus.map((menu, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{menu.menu_name}</td>
                                            {
                                                <td>{menu.menu_description}</td>
                                            }
                                            <td className="actions">
                                                <button onClick={()=>setDelitedMenuPopup(product)}><i className='bx bx-trash'></i></button>
                                                <button onClick={()=>setUpdateMenuPopup(product)}><i className='bx bx-edit-alt'></i></button>
                                            </td>
                                        </tr>
                                    )
                                }) : listMenus == null ? null : 
                                    <tr>
                                        <td colSpan="3">No products</td>
                                    </tr>
                            }
                        </tbody>
                    </table>

                    {
                        createNewElementPopup !== null &&
                        <Popup
                            closePopup={()=>setCreateNewElementPopup(null)}
                        >
                            <CreateNewElement 
                                createNewElementPopup={createNewElementPopup}
                                selectListMenus={selectListMenus}
                                closePopup={()=>setCreateNewElementPopup(null)}
                            />
                        </Popup>
                    }
    
                    {/* {
                        updateMenuPopup!== null && 
                        <Popup
                            closePopup={()=>setUpdateMenuPopup(null)}
                        >
                            <UpdateProduct 
                                product={updateMenuPopup}
                                selectProducts={selectProducts}
                                closePopup={()=>setUpdateMenuPopup(null)}
                            />
                        </Popup>
                    } */}
    
                    {/* {
                        delitedMenuPopup !== null &&
                        <Popup
                            closePopup={()=>setDelitedMenuPopup(null)} 
                        >
                            <ConfimationDelete 
                                product={delitedMenuPopup}
                                selectProducts={selectProducts} 
                                closePopup={()=>setDelitedMenuPopup(null)} 
                            />
                        </Popup>
                    } */}
    
                    {/* {
                        createNewElementPopup !== null &&
                        <Popup
                            closePopup={()=>setCreateNewElementPopup(null)}
                        >
                            <NewProduct 
                                selectProducts={selectProducts}
                                menu_id={props.menu_id}
                                closePopup={()=>setCreateNewElementPopup(null)}
                            />
                        </Popup>
                    } */}
                </div>
            }
        </section>
    )
}

export default MenusPage;