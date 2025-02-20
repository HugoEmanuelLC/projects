// Scripts
import { 
    verifyEmailFormat, 
    // sendEmailForVerification, 
    verifyPassword, 
    verifyToken,

    isValidEmail,
    decryptPassword,
    createToken,
    isValidToken
} from "./script.js";


import { 
    verifyListUsersFromDb, 
    addNewUserInDb, 
    getUserInformations,
    updateUserPassword,
    
    getAuthInformationsFoundInDB
} from "./scriptDB.js";


export const test = () => {
    console.log("test ok");
};




// Exports functions for server
export const userRegister = async (
    body,
    conn={
        connection: null, 
        valueTable: {
            tableAuthName: "", 
            colonneEmailName: "", 
            colonneIdName: "",
        }
    }
) => {
    console.log("userRegister -> ok");
    return await new Promise((resolve, reject) => {
        const userInfos = body;
        verifyEmailFormat(userInfos.email)
        .then(() => {
            // console.log("verifyEmailFormat -> ok");
            verifyListUsersFromDb(body, conn)
            .then((data) => {
                // console.log("verifyListUsersFromDb -> ok");
                data.id ? body[conn.valueTable.colonneIdName] = data.id : null;
                addNewUserInDb(body, conn)
                .then((data) => {
                    console.log("addNewUserInDb -> ok");
                    let addNewUserInDbData = data;
                    console.log(addNewUserInDbData);
                    resolve(addNewUserInDbData);
                })
                .catch(error => {
                    console.log("addNewUserInDb -> error");
                    reject(error);
                });
            })
            .catch(error => {
                console.log("verifyListUsersFromDb -> error");
                reject(error);
            });
        })
        .catch(error => {
            console.log("verifyEmailFormat -> error");
            reject(error);
        });
    });
}



export const userLogin = (
    body,
    conn={
        connection: null, 
        valueTable: {
            tableAuthName: "", 
            colonneEmailName: "", 
            colonnePasswordName: "", 
            colonneIdName: ""
        },
        valueToken: {
            expiresIn: "24h",
            secretKey: "create_a_random_token"
        }
    }
) => {
    let userInfos = body;
    return new Promise((resolve, reject) => {

        if (conn.connection == null) {
            reject({
                status: 500, 
                message: "server problem", 
                info: "connection == null"
            })
            return
        }

        verifyEmailFormat(userInfos.email)
        .then(() => {
            // console.log("verifyEmailFormat -> ok");
            getUserInformations(body, conn)
            .then((data) => {
                // console.log("getUserInformations -> ok");
                verifyPassword(data, userInfos, conn)
                .then(data => {
                    // console.log("verifyPassword -> ok");
                    resolve(data);
                })
                .catch(error => {
                    console.log("verifyPassword -> error");
                    reject(error);
                });
            })
            .catch(error => {
                console.log("getUserInformations -> error");
                reject(error);
            });
        })
        .catch(error => {
            console.log("verifyEmailFormat -> error");
            // console.log(error);
            reject(error);
        });
    });
};



/**
 * Verifies the provided token.
 * @param {string} token - The token to be verified.
 * @param {string} secretKey - The secret key used for token signing.
 * @param {boolean} authentication - 
 *     - true: Verify the token for authentication purposes.
 *     - false: Verify the token for secret link verification (e.g., email links).
 * @returns {Promise} - A Promise that resolves with the decoded payload if verification succeeds, 
 *                     or rejects with an error if verification fails.
 */
export const verifySecretLinkAndToken = async (token, secretKey, authentication = true) => {
    const defaultMessages = {
        secretLink: {
            correct: "secret key verified with successful",
            notCorrect: "the secret key is not correct"
        },
        authentication: {
            correct: "token verified with successful",
            notCorrect: "the token is not correct"
        }
    }
    return await new Promise((resolve, reject) => {
        verifyToken(
            token, 
            secretKey, 
            authentication ? defaultMessages.authentication 
            : defaultMessages.secretLink
        )
        .then(data => resolve(data))
        .catch(error => reject(error))
    });
}



export const forgotPassword = (body, conn = {
    connection: null, 
    valueTable: {
        tableAuthName: "", 
        colonneEmailName: "", 
        colonneIdName: ""
    },
    contentEmail: {
        fromTitle: "",
        subject: "",
        title: "",
        message: "",
        urlVerify: "",
        btnText: "",
        randomToken: "create_a_random_secret_key_token"
    },
    configEmail: {}
}) => {
    // console.log("forgotPassword -> ok");
    let userInfos = body;
    return new Promise((resolve, reject) => {
        verifyEmailFormat(userInfos.email)
        .then(() => {
            // console.log("verifyEmailFormat -> ok");
            getUserInformations(body, conn)
            .then((data) => {
                let getUserInformationsData = data;
                resolve(getUserInformationsData);
            })
            .catch(error => {
                console.log("getUserInformations -> error");
                reject(error);
            });
        })
        .catch(error => {
            console.log("verifyEmailFormat -> error");
            reject(error);
        });
    });
};



export const resetPassword = (body, conn) => {
    return new Promise((resolve, reject) => {
        verifyEmailFormat(body.email)
        .then(() => {
            console.log("verifyEmailFormat -> ok");
            getUserInformations(body, conn)
            .then(data => {
                data.info[0].newPassword = body.password
                console.log("getUserInformations -> ok");
                updateUserPassword(data.info[0], conn)
                .then(data => {
                    console.log("updateUserPassword -> ok");
                    resolve(data);
                })
                .catch(error => {
                    console.log("updateUserPassword -> error");
                    reject(error);
                });
            })
            .catch(error => {
                console.log("getUserInformations -> error");
                reject(error);
            });
        })
        .catch(error => {
            console.log("verifyEmailFormat -> error");
            reject(error);
        });
    });
};














export const verifAuthenticationLogin = (values) => {
    return new Promise((resolve, reject) => {

        if (!values.body.email || !values.body.password) {
            return reject({
                status: 400, 
                message: "Données d'authentification manquantes", 
                body: null
            });
        } 

        isValidEmail(values.body.email)
        .then(data => {
            getAuthInformationsFoundInDB(values)
                .then(data => {
                    if (data.infos[0].password === "admin" && data.infos[0].password === values.body.password) {
                        let createNewToken = createToken({
                            id: data.infos[0]._id, 
                            secretKey: values.valueToken.secretKey, 
                            expiresIn: values.valueToken.expiresIn
                        })
                        resolve({
                            status: data.status, 
                            message: "authentification accepted", 
                            infos: {
                                body: {
                                    auth: {
                                        username: data.infos[0].username,
                                        email: data.infos[0].email,
                                        token: createNewToken
                                    },
                                    userInfos: {}
                                }
                            }
                        });
                    }

                    decryptPassword({
                        passwordBody: values.body.password,
                        passwordBD: data.infos[0].password
                    })
                    .then(data => {
                        let createNewToken = createToken({
                            id: data.infos[0]._id, 
                            secretKey: values.valueToken.secretKey, 
                            expiresIn: values.valueToken.expiresIn
                        })
                        resolve({
                            status: data.status, 
                            message: "authentification accepted", 
                            infos: {
                                body: {
                                    auth: {
                                        username: data.infos[0].username,
                                        email: data.infos[0].email,
                                        token: createNewToken
                                    },
                                    userInfos: {}
                                }
                            }
                        });
                    })
                    .catch(error => {
                        reject(error);
                    });
                })
                .catch(error => {
                    reject(error);
                });
        })
        .catch(error => {
            console.log("isValidEmail -> error");
            console.log(error);
            reject(error);
        })
    });
}


export const verifSessionToken = (values, secretKey) => {
    return new Promise((resolve, reject) => {
        isValidToken(values.body.token, secretKey)
        .then(data => {
            values.body.id = data.infos.id;
            getAuthInformationsFoundInDB(values)
            .then(data => {
                resolve({
                    status: data.status, 
                    message: "session verified with successful", 
                    infos: {
                        body: {
                            auth: {
                                username: data.infos[0].username,
                                email: data.infos[0].email
                            },
                            userInfos: {}
                        }
                    }
                });
            })
            .catch(error => {
                console.log("getAuthInformationsFoundInDB -> error");
                console.error(error);
                reject(error);
            });
        })
        .catch(error => {
            console.log("isValidToken -> error");
            console.error(error);
            reject(error);
        });
    });
};