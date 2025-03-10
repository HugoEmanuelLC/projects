import urlForFetch, {cookieName} from "../../../authentication/scripts/fetch-urls";
import {fetchApi} from "../../../authentication/scripts/authentication-scripts";



export const productsSelect = (id) => {
    let getCookie = document.cookie;
    let cookieExistName = cookieName + "=";

    return new Promise((resolve, reject) => {

        if (getCookie.match(cookieExistName)) {
            getCookie = getCookie.slice(getCookie.indexOf(cookieName)+cookieName.length+1);
            fetchApi(urlForFetch.productsSelect+"/"+id, 'GET', {}, getCookie)
            .then((res) => {
                resolve(res.content.products);
            })
            .catch((err) => {
                console.error("Err : ", err);
                reject(err);
            });

        } else {
            reject(null);
        }
    })
}


export const productUpdate = (id, data) => {
    let getCookie = document.cookie;
    let cookieExistName = cookieName + "=";
    let body = {
        product: data
    }

    return new Promise((resolve, reject) => {

        if (getCookie.match(cookieExistName)) {
            getCookie = getCookie.slice(getCookie.indexOf(cookieName)+cookieName.length+1);
            fetchApi(urlForFetch.produitUpdate+"/"+id, 'PUT', body, getCookie)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                console.error("Err : ", err);
                reject(err);
            });

        } else {
            reject(null);
        }
    })
}


export const productCreate = (id, data) => {
    let getCookie = document.cookie;
    let cookieExistName = cookieName + "=";

    let body = {
        product: data
    }

    console.log("body : ");
    console.log(body);

    return new Promise((resolve, reject) => {

        if (getCookie.match(cookieExistName)) {
            getCookie = getCookie.slice(getCookie.indexOf(cookieName)+cookieName.length+1);
            fetchApi(urlForFetch.productCreate+"/"+id, 'POST', body, getCookie)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                console.error("Err : ", err);
                reject(err);
            });

        } else {
            reject(null);
        }
    })
}


export const productDelete = (id) => {
    let getCookie = document.cookie;
    let cookieExistName = cookieName + "=";

    return new Promise((resolve, reject) => {

        if (getCookie.match(cookieExistName)) {
            getCookie = getCookie.slice(getCookie.indexOf(cookieName)+cookieName.length+1);
            fetchApi(urlForFetch.productDelete+"/"+id, 'DELETE', {}, getCookie)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                console.error("Err : ", err);
                reject(err);
            });

        } else {
            reject(null);
        }
    })
}