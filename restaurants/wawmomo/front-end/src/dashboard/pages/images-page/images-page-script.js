import urlForFetch, {cookieName} from "../../../authentication/scripts/fetch-urls";
import {fetchApi} from "../../../authentication/scripts/authentication-scripts";



export const imageCreate = (data) => {
    let getCookie = document.cookie;
    let cookieExistName = cookieName + "=";

    const formData = new FormData();
    formData.append('file', data);

    let body = {
        formData: formData
    }
    
    console.log("imageCreate data : ------------ ");
    console.log(data);

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

            

            // fetch(urlForFetch.createImage, {
            //     method: 'POST',
            //     headers: {
            //         'Authorization': getCookie
            //     },
            //     body: formData
            // })
            // .then((res) => {
            //     res.json().then((res) => {
            //         console.log("Image create res : ", res);
            //         resolve(res);
            //     })
            // })
            // .catch((err) => {
            //     console.error("Err : ", err);
            //     reject(err);
            // });



            // axios.post(urlForFetch.createImage, formData, {
            //     headers: {
            //         'Authorization': getCookie
            //     }
            // })
            // .then((res) => {
            //     console.log("Image create res : ", res);
            //     resolve(res.data.content);
            // })
            // .catch((err) => {
            //     console.error("Err : ", err);
            //     reject(err);
            // });

        } else {
            reject(null);
        }
    })
}