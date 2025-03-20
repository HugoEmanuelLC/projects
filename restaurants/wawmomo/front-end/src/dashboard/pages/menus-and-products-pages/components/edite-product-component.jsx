import { useState, useEffect } from "react";

// CRUD
import { productCreate, productUpdate } from "../products-page-script";



export function NewProduct(props) {
    let modelProduct ={
        product_name: "",
        product_price: "",
        product_description: ""
    }
    const [ newProduct, setNewProduct ] = useState(modelProduct)
    const [ error, setError ] = useState(null)

    const handleChange = (e) => {
        setNewProduct({...newProduct, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (newProduct.product_name == "" || newProduct.product_price == "") {
            return setError("Vous devez remplir les champs obligatoires")
        }else{
            await productCreate(props.parent_id, newProduct)
            .then((res) => {
                console.log("res : ", res);
                setError("Produit créé")
                props.selectList()
                let timer = setTimeout(() => {
                    setError(null)
                    setNewProduct(modelProduct)
                    // props.closePopup()
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
            <h2>Création d'un nouveau produit pour:</h2>
            <h2>{props.menu_name}</h2>
            <input type="text" placeholder="product name" name="product_name" value={newProduct.product_name} onChange={handleChange} />
            <input type="text" placeholder="price '2.50' €" name="product_price" value={newProduct.product_price} onChange={handleChange} />
            <input type="text" placeholder="decription optionel" name="product_description" value={newProduct.product_description} onChange={handleChange} />
        </form>
        <button className="button" onClick={handleSubmit}>Créer</button>
        </>
    )
}




export function UpdateProduct(props){
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
    
            await productUpdate( props.product._id, productInfosToUpdate)
            .then((res) => {
                setError("Menu modifié")
                props.selectProducts()
                let timer = setTimeout(() => {
                    setError(null)
                    props.closePopup()
                }, 1000)
                return () => clearTimeout(timer)
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