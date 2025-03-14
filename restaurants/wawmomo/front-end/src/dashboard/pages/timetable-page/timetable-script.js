import urlForFetch, {cookieName} from "../../../authentication/scripts/fetch-urls";
import {fetchApi} from "../../../authentication/scripts/authentication-scripts";



export const timetableSelect = () => {
    let getCookie = document.cookie;
    let cookieExistName = cookieName + "=";

    return new Promise((resolve, reject) => {
        if (getCookie.match(cookieExistName)) {
            getCookie = getCookie.slice(getCookie.indexOf(cookieName)+cookieName.length+1);

            fetchApi(urlForFetch.selectTimetable, 'GET', {}, getCookie)
            .then((res) => {
                console.log("timetableSelect res : ");
                console.log(res.content);
                resolve(res.content.timetable);
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



export const timetableDayUpdate = (id, data) => {
    let getCookie = document.cookie;
    let cookieExistName = cookieName + "=";
    let body = {
        timetable: data
    }
    
    console.log("timetableDayUpdate data : ------------ ");
    console.log(data);

    return new Promise((resolve, reject) => {

        if (getCookie.match(cookieExistName)) {
            getCookie = getCookie.slice(getCookie.indexOf(cookieName)+cookieName.length+1);
            fetchApi(urlForFetch.updateTimetableDay+"/"+id, 'PUT', body, getCookie)
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


export const timetableDayCreate = (id, data) => {
    let getCookie = document.cookie;
    let cookieExistName = cookieName + "=";
    let body = {
        timetable: data
    }

    console.log("timetableDayCreate data : ------------ ");
    console.log(data);
    console.log("timetableDayCreate body : ------------ ");

    return new Promise((resolve, reject) => {
        if (getCookie.match(cookieExistName)) {
            getCookie = getCookie.slice(getCookie.indexOf(cookieName)+cookieName.length+1);

            fetchApi(urlForFetch.createTimetableDay+"/"+id, 'POST', body, getCookie)
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


export const timetableDayDelete = (id) => {
    let getCookie = document.cookie;
    let cookieExistName = cookieName + "=";

    return new Promise((resolve, reject) => {
        if (getCookie.match(cookieExistName)) {
            getCookie = getCookie.slice(getCookie.indexOf(cookieName)+cookieName.length+1);

            fetchApi(urlForFetch.deleteTimetableDay+"/"+id, 'DELETE', {}, getCookie)
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



export const timetableCommentUpdate = (id, data) => {
    let getCookie = document.cookie;
    let cookieExistName = cookieName + "=";
    let body = {
        timetable: data
    }

    return new Promise((resolve, reject) => {
        if (getCookie.match(cookieExistName)) {
            getCookie = getCookie.slice(getCookie.indexOf(cookieName)+cookieName.length+1);

            fetchApi(urlForFetch.updateTimetableComment+"/"+id, 'PUT', body, getCookie)
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


export const timetableCommentDelete = (id) => {
    let getCookie = document.cookie;
    let cookieExistName = cookieName + "=";
    let body = {
        timetable: {
            comment: ""
        }
    }

    return new Promise((resolve, reject) => {
        if (getCookie.match(cookieExistName)) {
            getCookie = getCookie.slice(getCookie.indexOf(cookieName)+cookieName.length+1);

            fetchApi(urlForFetch.updateTimetableComment+"/"+id, 'PUT', body, getCookie)
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