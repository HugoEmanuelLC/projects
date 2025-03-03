import { useState, useEffect } from "react";

import { menusSelect, productsSelect } from "../../../authentication/scripts/authentication-scripts";

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
                                            <button onClick={()=>setPopup(product._id)}><i className='bx bx-edit-alt'></i></button>
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
                    product_id={popup}
                    product={{
                        product_name: "", 
                        product_price: "", 
                        product_description: ""}} 
                    closePopup={()=>setPopup(null)}
                />}
            </div>
    )
}



function Popup(props) {
    // creation d'un popup avec un formulaire pour modifier un produit
    // props : product, closePopup

    const [ product, setProduct ] = useState(props.product)
    const [ loading, setLoading ] = useState(true)
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
        setProduct({...product, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // fetch pour modifier le produit
    }

    return (
        <div className="popup">
            <div className="popup_content">
                <form onSubmit={handleSubmit}>
                    <h2>Edition pour : {props.product_id}</h2>
                    <input type="text" placeholder="product name" name="product_name" value={product.product_name} onChange={handleChange} />
                    <input type="text" placeholder="price '2.50' €" name="product_price" value={product.product_price} onChange={handleChange} />
                    <input type="text" placeholder="decription optionel" name="product_description" value={product.product_description} onChange={handleChange} />
                </form>
                <button className="button">Modifier</button>
                <button className="close" onClick={props.closePopup}>Fermer</button>
            </div>
        </div>

        // <tr>
        //     <td colSpan="4">
        //         <form onSubmit={handleSubmit}>
        //             <input type="text" name="product_name" value={product.product_name} onChange={handleChange} />
        //             <input type="number" name="product_price" value={product.product_price} onChange={handleChange} />
        //             <input type="text" name="product_description" value={product.product_description} onChange={handleChange} />
        //             <button>Modifier</button>
        //         </form>
        //         <button onClick={props.closePopup}>Fermer</button>
        //     </td>
        // </tr>
    )
}