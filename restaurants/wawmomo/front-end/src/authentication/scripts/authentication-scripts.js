import urlForFetch, {cookieName} from "./fetch-urls";


export const fetchApi = async (url, method, body = {}, token = null) => {
    let options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token ? token : null
        }
    };

    if (method === "POST" || method === "PUT") {
        options.body = JSON.stringify(body);
    }
    
    return new Promise((resolve, reject) => {
        fetch(url, options)
        .then(response => {
            if (response.status === 200 || response.status === 201) {
                response.json().then((data) => {
                    resolve(data);
                });
            } else {
                response.status == 204 ? 
                    reject({message: "no content"}) 
                    : response.json().then((data) => {
                        reject(data);
                    });
            }
        })
        .catch((err) => {
            console.error("Err : ", err);
            reject(err);
        });
    })
}


const createCookie = (name, value, days) => {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}


export const deleteCookie = (name) => {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}


export const login = (data) => {
    let body = {
        auth: {
            email: data.username,
            password: data.password
        }
    }
    return new Promise((resolve, reject) => {
        fetchApi(urlForFetch.login, 'POST', body, null)
        .then((res) => {
            createCookie(cookieName, res.token, 1);
            resolve({
                auth: res.content.auth
            });
        })
        .catch((err) => {
            console.error("Err : ", err);
            reject(err);
        });
    })
}


export const checkSession = (cookieName) => {
    let getCookie = document.cookie;
    let cookieExistName = cookieName + "=";

    return new Promise((resolve, reject) => {
        if (getCookie.match(cookieExistName)) {
            getCookie = getCookie.slice(getCookie.indexOf(cookieName)+cookieName.length+1);

            fetchApi(urlForFetch.verifSession, 'POST', {}, getCookie)
            .then((res) => {
                resolve({
                    auth: res.content.auth
                });
            })
            .catch((err) => {
                console.log("err : ", err);
                if (err.message === "invalid signature") {
                    deleteCookie(cookieExistName);
                    reject({message: "session invalid"});

                }else if(err.message == "jwt expired"){
                    deleteCookie(cookieExistName);
                    reject({message: "session expired"});
                }else{
                    deleteCookie(cookieExistName);
                    reject({message: "problem server, session invalid"});
                }
            });
        } else {
            reject(null);
        }
    })
}


export const forgotPassword = (data) => {
    let body = {
        auth: {
            email: data.email,
            urlToVerify: window.location.origin+"/dash/auth/update-password"
        }
    }
    return new Promise((resolve, reject) => {
        fetchApi(urlForFetch.forgotPassword, 'POST', body)
        .then((res) => {
            resolve(res);
        })
        .catch((err) => {
            console.error("Err : ", err);
            reject(err);
        });
    })
} 


export const updatePassword = (data) => {
    let body = {
        auth: {
            password: data.password,
        }
    }
    return new Promise((resolve, reject) => {
        fetchApi(urlForFetch.updatePassword, 'POST', body, data.token)
        .then((res) => {
            resolve(res);
        })
        .catch((err) => {
            console.error("Err : ", err);
            reject(err);
        });
    })
}
