
const urlForFetch = {
    login: 'http://localhost:3001/auth/login',
    register: 'http://localhost:3001/auth/register',
    logout: 'http://localhost:3001/auth/logout',
    forgotPassword: 'http://localhost:3001/auth/forgot-password',
    verifyLink: 'http://localhost:3001/auth/verify-link',
    verifSession: 'http://localhost:3001/auth/verif-session',
}


const fetchApi = async (url, method, body = {}, token = null) => {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? token : null
            },
            body: JSON.stringify(body),
        })
        .then(response => {
            console.log("response : ");
            console.log(response);

            if (response.status === 200) {
                response.json().then((data) => {
                    resolve(data);
                });
            } else {
                response.json().then((data) => {
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


export const checkCookie = (name) => {
    var cookie = document.cookie;
    let cookieExistName = name + "=";

    if (cookie.match(cookieExistName)) {
        return true;
    } else {
        return false;
    }
}


export const deleteCookie = (name) => {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}





export const register = (data) => {
    let body = {
        email: data.username,
        password: data.password,
        urlToVerify: window.location.origin+"/verify-link"
    }
    return new Promise((resolve, reject) => {
        fetchApi(urlForFetch.register, 'POST', body)
        .then((res) => {
            console.log("res : ", res);
            resolve(res);
        })
        .catch((err) => {
            console.error("Err : ", err);
            reject(err);
        });
    })
}



export const verifyLink = async (data) => {
    let body = {
        token: data,
    }
    return await new Promise((resolve, reject) => {
        fetchApi(urlForFetch.verifyLink, 'POST', body)
        .then((res) => {
            console.log("res : ", res);
            resolve(res);
        })
        .catch((err) => {
            console.error("Err : ", err);
            reject(err);
        });
    })
}


export const forgotPassword = (data) => {
    let body = {
        email: data,
    }
    return new Promise((resolve, reject) => {
        fetchApi(urlForFetch.forgotPassword, 'POST', body)
        .then((res) => {
            console.log("res : ", res);
            resolve(res);
        })
        .catch((err) => {
            console.error("Err : ", err);
            reject(err);
        });
    })
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
            console.log("res : ", res.content);
            createCookie("auth", res.token, 1);
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
    let body = {
        auth: {}
    }
    var cookie = document.cookie;
    let cookieExistName = cookieName + "=";

    return new Promise((resolve, reject) => {
        if (cookie.match(cookieExistName)) {
            let getCookie = document.cookie;
            getCookie = getCookie.slice(getCookie.indexOf(cookieName)+cookieName.length+1);

            fetchApi(urlForFetch.verifSession, 'POST', {}, getCookie)
            .then((res) => {
                console.log("res : ");
                console.log(res);
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
                    reject({message: "server problem, session invalid"});
                }
            });
        } else {
            reject(null);
        }
    })
}