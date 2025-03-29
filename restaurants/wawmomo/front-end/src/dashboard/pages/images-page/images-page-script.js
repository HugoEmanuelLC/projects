import urlForFetch, {cookieName} from "../../../authentication/scripts/fetch-urls";
import {fetchApi} from "../../../authentication/scripts/authentication-scripts";



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

            

            // fetch(urlForFetch.createImage, {
            //     method: 'POST',
            //     headers: {
            //         // 'Content-Type': 'multipart/form-data',
            //         'Authorization': getCookie
            //     },
            //     body: body.formData
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