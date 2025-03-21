import { useState, useEffect } from "react";

// CRUD
import { menusSelect } from "./menus-page-script";
import { productsSelect, productDelete } from "./products-page-script";

import Popup, { ConfimationDelete } from "../../components/popup-component/popup-component";
import { NewProduct, UpdateProduct } from "./components/edite-product-component";
import { NewMenu } from "./components/edite-menu-component";

function ProductsPage() {
    const [ listMenus, setListMenus ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ selectedMenu, setSelectedMenu ] = useState(null)

    const [ createNewElementPopup, setCreateNewElementPopup ] = useState(null)


    const selectListMenus = async () => {
        await menusSelect()
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

    return (
        <section className="box_content_settings" >
            {
                loading ? <h1>...</h1> : 
                <>
                <div className="btn_new_add" onClick={()=>setCreateNewElementPopup(true)}>Ajouter menu</div>
                <div className="list_head_links">
                    <ul>
                    {
                        listMenus.map((menu, index) => {
                            return (
                                <li key={index} onClick={()=>setSelectedMenu(menu._id)} className={selectedMenu == menu._id ? "selected" : ""}>
                                    {menu.menu_name} 
                                    {/* {selectedMenu == menu._id && <hr />} */}
                                </li>
                            )
                        })
                    }
                    </ul>
                </div>
                </>
            }

            <ProductsComponent menu_id={selectedMenu} menu_name={
                listMenus.filter((menu) => menu._id == selectedMenu)[0]?.menu_name
            } />

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
        </section>
    )
}

export default ProductsPage;






function ProductsComponent(props) {
    const [ loading, setLoading ] = useState(true)
    const [ products, setProducts ] = useState([])

    const [ updateProductPopup, setUpdateProductPopup] = useState(null)
    const [ delitedProductPopup, setDelitedProductPopup ] = useState(null)
    const [ createNewElementPopup, setCreateNewElementPopup ] = useState(null)

    
    const selectProducts = async () => {
        await productsSelect(props.menu_id)
        .then((res) => {
            setProducts(res)
        })
        .catch((err) => {
            setProducts([])
        });
    }

    const handleLoading = (close=null) => {
        // selectProducts()
        let load = setTimeout(() => {
            setLoading(false)
        }, 500)
        return () => clearTimeout(load)
    }

    useEffect(() => {
        loading == true && handleLoading()
    }, [loading])

    useEffect(() => {
        props.menu_id !== null && selectProducts()
    }, [props.menu_id])

    return (
        loading ? <h1></h1> : 
            <>
            {props.menu_id && <div className="btn_new_add" onClick={()=>setCreateNewElementPopup("product")}>Ajouter produit </div>}
            <div className="list_datas">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products?.length > 0 ? products.map((product, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{product.product_name}</td>
                                        <td>{product.product_price}€</td>
                                        {
                                            // product.product_description == "vide" || product.product_description == "empty" ? <td></td> : 
                                            <td>{product.product_description}</td>
                                        }
                                        <td className="actions">
                                            <button onClick={()=>setDelitedProductPopup(product)}><i className='bx bx-trash'></i></button>
                                            <button onClick={()=>setUpdateProductPopup(product)}><i className='bx bx-edit-alt'></i></button>
                                        </td>
                                    </tr>
                                )
                            }) : products == null ? null : 
                                <tr>
                                    <td colSpan="4">No products</td>
                                </tr>
                        }
                    </tbody>
                </table>

                {
                    updateProductPopup!== null && 
                    <Popup
                        closePopup={()=>setUpdateProductPopup(null)}
                    >
                        <UpdateProduct 
                            product={updateProductPopup}
                            selectProducts={selectProducts}
                            closePopup={()=>setUpdateProductPopup(null)}
                        />
                    </Popup>
                }

                {
                    delitedProductPopup !== null &&
                    <Popup
                        closePopup={()=>setDelitedProductPopup(null)} 
                    >
                        <ConfimationDelete 
                            datas={{
                                id: delitedProductPopup._id,
                                name: delitedProductPopup.product_name
                            }}
                            selectDatas={selectProducts} 
                            msg="Produit supprimé"
                            closePopup={()=>setDelitedProductPopup(null)} 
                            fnc={productDelete}
                        />
                    </Popup>
                }

                {
                    createNewElementPopup !== null &&
                    <Popup
                        closePopup={()=>setCreateNewElementPopup(null)}
                    >
                        <NewProduct 
                            selectList={selectProducts}
                            parent_id={props.menu_id}
                            menu_name={props.menu_name}
                            closePopup={()=>setCreateNewElementPopup(null)}
                        />
                    </Popup>
                }
            </div>
            </>
    )
}



