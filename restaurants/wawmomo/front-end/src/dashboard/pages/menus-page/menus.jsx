import { useState, useEffect } from "react";

import { menusSelect, productsSelect, productUpdate } from "../../../authentication/scripts/authentication-scripts";

function MenusPage() {
    const [ listMenus, setListMenus ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ selectedMenu, setSelectedMenu ] = useState(null)

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

    return (
        <section className="menus" >
            {
                loading ? <h1>...</h1> : 
                <div className="list_menus">
                    <ul>
                    {
                        listMenus.map((menu, index) => {
                            return (
                                <li key={index} onClick={()=>setSelectedMenu(menu._id)}>
                                    {menu.menu_name} 
                                    {selectedMenu == menu._id && <hr />}
                                </li>
                            )
                        })
                    }
                    </ul>
                </div>
            }

            <ProductsComponent menu_id={selectedMenu} />
        </section>
    )
}

export default MenusPage;






function ProductsComponent(props) {
    const [ products, setProducts ] = useState(null)
    const [ loading, setLoading ] = useState(true)
    const [ popup, setPopup ] = useState(null)

    const selectProducts = async () => {
        await productsSelect("auth", props.menu_id)
        .then((res) => {
            console.log("res : ", res);
            setProducts(res)
        })
        .catch((err) => {
            setProducts([])
            console.error("Err : ", err);
        });
        setPopup(null)
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

    useEffect(() => {
        console.log("popup : ", popup);
    }, [popup])

    return (
        loading ? <h1></h1> : 
            <div className="list_products">
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
                                        <td>{product.product_description}</td>
                                        <td className="actions">
                                            <button><i className='bx bx-trash'></i></button>
                                            <button onClick={()=>setPopup(product)}><i className='bx bx-edit-alt'></i></button>
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
                popup !== null && 
                <Popup 
                    product={popup}
                    selectProducts={selectProducts}
                    closePopup={()=>setPopup(null)}
                />}
            </div>
    )
}



function Popup(props) {
    // creation d'un popup avec un formulaire pour modifier un produit
    // props : product, closePopup

    const productDefault={
        product_name: "", 
        product_price: "", 
        product_description: ""
    } 

    const [ loading, setLoading ] = useState(true)
    const [ newProduct, setNewProduct ] = useState(productDefault)
    const [ error, setError ] = useState(null)

    const handleLoading = (close=null) => {
        let load = setTimeout(() => {
            setLoading(false)
        }, 500)
        return () => clearTimeout(load)
    }

    useEffect(() => {
        loading == true && handleLoading()
    }, [loading])

    const handleChange = (e) => {
        setNewProduct({...newProduct, [e.target.name]: e.target.value})
    }

    useEffect(() => {
        // console.log("newProduct : ");
        // console.log(newProduct);
        setError(null)
    }, [newProduct])

    const handleSubmit = async (e) => {
        e.preventDefault()

        let productInfosToUpdate = {
            product_name: "",
            product_price: "",
            product_description: ""
        }

        if (newProduct.product_name == "" && newProduct.product_price == "" && newProduct.product_description == "") {
            return setError("Vous n'avez rien modifié")
        }else {

            const productFnc = async (place, newInfo, oldInfo) => {
                if (newInfo !== "" && newInfo !== oldInfo ) {productInfosToUpdate[place] = newInfo} 
                else {productInfosToUpdate[place] = oldInfo}
            }

            await productFnc("product_name", newProduct.product_name, props.product.product_name)
            await productFnc("product_price", newProduct.product_price, props.product.product_price)
            await productFnc("product_description", newProduct.product_description, props.product.product_description)
    
            await productUpdate("auth", props.product._id, productInfosToUpdate)
            .then((res) => {
                // console.log("res : ", res);
                props.selectProducts()
                props.closePopup()
            })
            .catch((err) => {
                console.error("Err : ", err);
            });
        }
    }

    return (
        <div className="popup">
            <div className="popup_content">
                <span>{error}</span>
                <form >
                    <h2>Edition pour : {props.product._id}</h2>
                    <input type="text" placeholder="product name" name="product_name" value={newProduct.product_name} onChange={handleChange} />
                    <input type="text" placeholder="price '2.50' €" name="product_price" value={newProduct.product_price} onChange={handleChange} />
                    <input type="text" placeholder="decription optionel" name="product_description" value={newProduct.product_description} onChange={handleChange} />
                </form>
                <button className="button" onClick={handleSubmit}>Modifier</button>
                <button className="close" onClick={props.closePopup}>Fermer</button>
            </div>
        </div>
    )
}