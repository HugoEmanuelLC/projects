// Dependencies
import { useEffect, useState } from "react";

// Scripts
import { menusList, productsListFromMenu } from "./menus-component-script";

function Menus(props){
    const [buttonActive, setButtonActive] = useState(null);
    const [menus, setMenus] = useState([]);
    const [products, setProducts] = useState([]);

    const [ loading, setLoading ] = useState(true)

    const handleLoading = (close=null) => {
        // setLoading(true)
        let load = setTimeout(() => {
            setLoading(false)
        }, 500)
        return () => clearTimeout(load)
    }

    const handleButtonActive = async (menuId) => {
        setButtonActive(menuId);
    }

    const handleSelectProductsList = async (menuId) => {
        await productsListFromMenu(menus[menuId]._id)
        .then((res) => {
            setProducts(res);
        })
        .catch((err) => {
            setProducts([]);
            console.error("Err : ", err);
        });
    } 

    const handleSelectMenusList = async () => {
        await menusList()
        .then((res) => {
            setButtonActive(0);
            setMenus(res);
            
            productsListFromMenu(res[0]._id)
            .then((res) => {
                setProducts(res);
            })
            .catch((err) => {
                console.error("Err : ", err);
            });

        })
        .catch((err) => {
            console.error("Err : ", err);
        });
    }

    useEffect(() => {
        handleSelectMenusList();
    }, []);

    useEffect(() => {
        loading == true && handleLoading()
    }, [loading])


    return (
        <>
        <div className="popup_head menus_list">
            <h2>Menus</h2>
            <ul>
                {
                    menus?.length > 0 ? menus.map((menu, index) => {
                        return (
                            <li key={index}>
                                <button onClick={(e)=>{setLoading(true);
                                    handleButtonActive(index); 
                                    handleSelectProductsList(index)}} 
                                    className={buttonActive == index ? "active" : ""}>{menu?.menu_name}</button>
                            </li>
                        )
                    }) : <div className="no_product">No menu found</div>
                }
            </ul>
            {/* <hr /> */}
        </div>

        <div className="popup_body products_list">
            <div className="box">
            {
                products?.length > 0 ? products.map((product, index) => {
                    return (
                        <div key={index} className="product_item">
                            <h3>{product?.product_name}</h3>
                            <p>{product?.product_description !== "" && product?.product_description}</p>
                            <span>{product?.product_price}€</span>
                        </div>
                    )
                }) : <div className="no_product">No product found</div>
            }
            </div>
        </div>
        </>
    )
}

export default Menus;