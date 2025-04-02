import urlForFetch, {cookieName} from "../../../authentication/scripts/fetch-urls";
import {fetchApi} from "../../../authentication/scripts/authentication-scripts";



export const selectListImages = async () => {
    let getCookie = document.cookie;
    let cookieExistName = cookieName + "=";

    return new Promise((resolve, reject) => {
        if (getCookie.match(cookieExistName)) {
            getCookie = getCookie.slice(getCookie.indexOf(cookieName)+cookieName.length+1);

            fetchApi(urlForFetch.selectImage, 'GET', {}, getCookie)
            .then((res) => {
                console.log("Image select res : ");
                console.log(res.content.images);
                resolve(res.content.images);
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



export const imageCreate = async (data) => {
    let getCookie = document.cookie;
    let cookieExistName = cookieName + "=";

    const formData = new FormData();
    formData.append('file', data);
    formData.append('section', 's1');

    // let body = {
    //     formData: formData,
    //     section: "s1"
    // }
    
    console.log("imageCreate data : ------------ ");
    console.log(data);
    console.log("imageCreate data : ------------ ");
    // console.log(formData);

    return new Promise((resolve, reject) => {

        if (getCookie.match(cookieExistName)) {
            getCookie = getCookie.slice(getCookie.indexOf(cookieName)+cookieName.length+1);

            fetchApi(urlForFetch.createImage, 'POST', formData, getCookie)
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





export const imageUpdate = async (id, data) => {
    let getCookie = document.cookie;
    let cookieExistName = cookieName + "=";

    
    let body = { 
        image: data 
    } 

    return new Promise((resolve, reject) => {
        if (getCookie.match(cookieExistName)) {
            getCookie = getCookie.slice(getCookie.indexOf(cookieName)+cookieName.length+1);

            fetchApi(urlForFetch.imageUpdate+"/"+id, 'PUT', body, getCookie)
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




export const imageDelete = async (id, data) => {
    let getCookie = document.cookie;
    let cookieExistName = cookieName + "=";

    let body = { 
        image: data 
    }

    return new Promise((resolve, reject) => {
        if (getCookie.match(cookieExistName)) {
            getCookie = getCookie.slice(getCookie.indexOf(cookieName)+cookieName.length+1);

            fetchApi(urlForFetch.imageDelete+"/"+id, 'DELETE', body, getCookie)
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