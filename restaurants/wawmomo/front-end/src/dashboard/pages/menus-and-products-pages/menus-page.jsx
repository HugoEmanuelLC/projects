import { useState, useEffect } from "react";

// CRUD
import { menusSelect, menuDelete } from "./menus-page-script";

import Popup, { ConfimationDelete } from "../../components/popup-component/popup-component";
import { NewMenu, UpdateMenu } from "./components/edite-menu-component";


function MenusPage() {
    const [ loading, setLoading ] = useState(true)
    const [ listMenus, setListMenus ] = useState([])

    const [ updateMenuPopup, setUpdateMenuPopup] = useState(null)
    const [ delitedMenuPopup, setDelitedMenuPopup ] = useState(null)
    const [ createNewElementPopup, setCreateNewElementPopup ] = useState(null)


    const selectListMenus = async () => {
        await menusSelect()
        .then((res) => {
            console.log("res : ", res);
            setListMenus(res)
        })
        .catch((err) => {
            setListMenus([])
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


    return (
        <section className="box_content_settings">
            {
                loading ? <h1>...</h1> : 
                <>
                <div className="btn_new_add" onClick={()=>setCreateNewElementPopup(true)}>Ajouter menu</div>
                <div className="list_datas">
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
                                            <td>{menu.menu_image}</td>
                                            <td className="actions">
                                                <button onClick={()=>setDelitedMenuPopup(menu)}><i className='bx bx-trash'></i></button>
                                                <button onClick={()=>setUpdateMenuPopup(menu)}><i className='bx bx-edit-alt'></i></button>
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
                            <NewMenu 
                                selectList={selectListMenus}
                                closePopup={()=>setCreateNewElementPopup(null)}
                            />
                        </Popup>
                    }
    
                    {
                        updateMenuPopup!== null && 
                        <Popup
                            closePopup={()=>setUpdateMenuPopup(null)}
                        >
                            <UpdateMenu
                                menu={updateMenuPopup}
                                selectListMenus={selectListMenus}
                                closePopup={()=>setUpdateMenuPopup(null)}
                            />
                        </Popup>
                    }
    
                    {
                        delitedMenuPopup !== null &&
                        <Popup
                            closePopup={()=>setDelitedMenuPopup(null)} 
                        >
                            <ConfimationDelete 
                                datas={
                                    {
                                        id: delitedMenuPopup._id,
                                        name: delitedMenuPopup.menu_name
                                    }
                                }
                                selectDatas={selectListMenus}
                                msg="Menu supprimé"
                                closePopup={()=>setDelitedMenuPopup(null)}
                                fnc={menuDelete}
                            />
                        </Popup>
                    }
                </div>
                </>
            }
        </section>
    )
}

export default MenusPage;