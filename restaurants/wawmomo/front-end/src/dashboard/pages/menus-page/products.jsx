import { useState, useEffect } from "react";

import { menusSelect, productsSelect, productUpdate, productDelete, menuCreate, productCreate } from "../../../authentication/scripts/authentication-scripts";

function ProductsPage() {
    const [ listMenus, setListMenus ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ selectedMenu, setSelectedMenu ] = useState(null)

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

    return (
        <section className="menus" >
            {
                loading ? <h1>...</h1> : 
                <div className="list_menus">
                    <div className="btnPlus" onClick={()=>setCreateNewElementPopup("menu")}>+</div>
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
        </section>
    )
}

export default ProductsPage;






function ProductsComponent(props) {
    const [ products, setProducts ] = useState(null)
    const [ loading, setLoading ] = useState(true)

    const [ updateProductPopup, setUpdateProductPopup] = useState(null)
    const [ delitedProductPopup, setDelitedProductPopup ] = useState(null)
    const [ createNewElementPopup, setCreateNewElementPopup ] = useState(null)

    const selectProducts = async () => {
        await productsSelect("auth", props.menu_id)
        .then((res) => {
            // console.log("res :  ------------------");
            // console.log(res);
            setProducts(res)
        })
        .catch((err) => {
            setProducts([])
            // console.error("Err : ", err);
        });
        setUpdateProductPopup(null)
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
        console.log("updateProductPopup: ", updateProductPopup);
    }, [updateProductPopup])

    return (
        loading ? <h1></h1> : 
            <div className="list_products">
            <div className="btnPlus" onClick={()=>setCreateNewElementPopup("product")}>+</div>
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
                            data={delitedProductPopup}
                            selectDatas={selectProducts} 
                            msg="Produit supprimé"
                            closePopup={()=>setDelitedProductPopup(null)} 
                        />
                    </Popup>
                }

                {
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
                }
            </div>
    )
}



function Popup(props) {

    const [ loading, setLoading ] = useState(true)

    const handleLoading = (close=null) => {
        let load = setTimeout(() => {
            setLoading(false)
        }, 500)
        return () => clearTimeout(load)
    }

    useEffect(() => {
        loading == true && handleLoading()
    }, [loading])

    return (
        <div className="popup">
            <div className="popup_content">
                {props.children}
                <button className="close" onClick={props.closePopup}>Fermer</button>
            </div>
        </div>
    )
}






function UpdateProduct(props){
    const productDefault={
        product_name: "", 
        product_price: "", 
        product_description: ""
    }
    
    const [ newProduct, setNewProduct ] = useState(productDefault)
    const [ error, setError ] = useState(null)

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
        <>
        <span>{error}</span>
        <form >
            <h2>Edition pour : {props.product.product_name.toUpperCase()}</h2>
            <input type="text" placeholder="product name" name="product_name" value={newProduct.product_name} onChange={handleChange} />
            <input type="text" placeholder="price '2.50' €" name="product_price" value={newProduct.product_price} onChange={handleChange} />
            <input type="text" placeholder="decription optionel" name="product_description" value={newProduct.product_description} onChange={handleChange} />
        </form>
        <button className="button" onClick={handleSubmit}>Modifier</button>
        </>
    )
}


function ConfimationDelete(props) {
    const [ msg, setMsg ] = useState(null)
    const handleDelete = async () => {
        await productDelete("auth", props.product._id)
        .then((res) => {
            props.selectProducts()
            setMsg("Produit supprimé")
            let timer = setTimeout(() => {
                setMsg(null)
                props.closePopup()
            }, 1000)
            return () => clearTimeout(timer)
        })
        .catch((err) => {
            console.error("Err : ", err);
        });
    }

    return (
        <>
        {
            msg == null ? 
            <h2>Confirmer la suppression de {props.product.product_name}</h2> : 
            <h2>{msg}</h2>
        }
        {msg == null && <button className="button" onClick={handleDelete}>Supprimer</button>}
        </>
    )
}



function CreateNewElement(props) {

    return (
        props.createNewElementPopup == "menu" ? 
            <NewMenu selectListMenus={props.selectListMenus} closePopup={props.closePopup} /> 
        : props.createNewElementPopup == "product" ?
            <NewProduct selectProducts={props.selectProducts} menu_id={props.menu_id} closePopup={props.closePopup} /> :
        <h1>...</h1>
    )
}



function NewMenu(props) {
    const [ newMenu, setNewMenu ] = useState("")
    const [ error, setError ] = useState(null)

    const handleChange = (e) => {
        setNewMenu(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (newMenu == "") {
            return setError("Vous devez remplir les champs obligatoires")
        }else{
            await menuCreate("auth", [newMenu])
            .then((res) => {
                console.log("res : ", res);
                setError("Menu créé")
                props.selectListMenus()
                let timer = setTimeout(() => {
                    setError(null)
                    props.closePopup()
                }, 1000)
                return () => clearTimeout(timer)
            })
            .catch((err) => {
                setError("Erreur lors de la création")
                console.error("Err : ", err);
            });
        }
    }

    useEffect(() => {
        setError(null)
    }, [newMenu])

    return (
        <>
        <span>{error}</span>
        <form >
            <h2>Création d'un nouveau menu</h2>
            <input type="text" placeholder="menu name" value={newMenu} onChange={handleChange} />
        </form>
        <button className="button" onClick={handleSubmit}>Créer</button>
        </>
    )
}



function NewProduct(props) {
    const [ newProduct, setNewProduct ] = useState({
        name: "",
        price: "",
        description: ""
    })
    const [ error, setError ] = useState(null)

    const handleChange = (e) => {
        setNewProduct({...newProduct, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (newProduct.name == "" || newProduct.price == "") {
            return setError("Vous devez remplir les champs obligatoires")
        }else{
            await productCreate("auth", props.menu_id, [newProduct.name, newProduct.price, newProduct.description])
            .then((res) => {
                console.log("res : ", res);
                setError("Produit créé")
                props.selectProducts()
                let timer = setTimeout(() => {
                    setError(null)
                    props.closePopup()
                }, 1000)
                return () => clearTimeout(timer)
            })
            .catch((err) => {
                setError("Erreur lors de la création")
                console.error("Err : ", err);
            });
        }
    }

    useEffect(() => {
        setError(null)
    }, [newProduct])

    return (
        <>
        <span>{error}</span>
        <form >
            <h2>Création d'un nouveau produit</h2>
            <input type="text" placeholder="product name" name="name" value={newProduct.name} onChange={handleChange} />
            <input type="text" placeholder="price '2.50' €" name="price" value={newProduct.price} onChange={handleChange} />
            <input type="text" placeholder="decription optionel" name="description" value={newProduct.description} onChange={handleChange} />
        </form>
        <button className="button" onClick={handleSubmit}>Créer</button>
        </>
    )
}