import urlForFetch, {cookieName} from "../../../authentication/scripts/fetch-urls";
import {fetchApi} from "../../../authentication/scripts/authentication-scripts";



export const menusSelect = () => {
    let getCookie = document.cookie;
    let cookieExistName = cookieName + "=";

    return new Promise((resolve, reject) => {

        if (getCookie.match(cookieExistName)) {
            getCookie = getCookie.slice(getCookie.indexOf(cookieName)+cookieName.length+1);
            fetchApi(urlForFetch.menusSelect, 'GET', {}, getCookie)
            .then((res) => {
                resolve(res.content.menus);
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


export const menuCreate = (data) => {
    let getCookie = document.cookie;
    let cookieExistName = cookieName + "=";

    let body = {
        menu: data
    }

    return new Promise((resolve, reject) => {

        if (getCookie.match(cookieExistName)) {
            getCookie = getCookie.slice(getCookie.indexOf(cookieName)+cookieName.length+1);
            fetchApi(urlForFetch.menuCreate, 'POST', body, getCookie)
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


export const menuUpdate = (id, data) => {
    let getCookie = document.cookie;
    let cookieExistName = cookieName + "=";
    let body = { 
        menu: data 
    }    
    
    console.log("menuUpdate data : ------------ ");
    console.log(data);

    return new Promise((resolve, reject) => {

        if (getCookie.match(cookieExistName)) {
            getCookie = getCookie.slice(getCookie.indexOf(cookieName)+cookieName.length+1);
            fetchApi(urlForFetch.menuUpdate+"/"+id, 'PUT', body, getCookie)
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


export const menuDelete = (id) => {
    let getCookie = document.cookie;
    let cookieExistName = cookieName + "=";

    return new Promise((resolve, reject) => {

        if (getCookie.match(cookieExistName)) {
            getCookie = getCookie.slice(getCookie.indexOf(cookieName)+cookieName.length+1);
            fetchApi(urlForFetch.menuDelete+"/"+id, 'DELETE', {}, getCookie)
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