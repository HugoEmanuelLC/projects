import urlForFetch from "../../../authentication/scripts/fetch-urls";
import {fetchApi} from "../../../authentication/scripts/authentication-scripts";


export const menusList = () => {
    return new Promise((resolve, reject) => {
        fetchApi(urlForFetch.menusList, 'GET', {}, null)
        .then((res) => {
            resolve(res.content.menus);
        })
        .catch((err) => {
            console.error("Err : ", err);
            reject(err);
        });
    })
}

export const productsListFromMenu = (menuId) => {
    return new Promise((resolve, reject) => {
        fetchApi(urlForFetch.productsListFromMenu+'/'+menuId, 'GET', {}, null)
        .then((res) => {
            resolve(res.content.products);
        })
        .catch((err) => {
            console.error("Err : ", err);
            reject(err);
        });
    })
}