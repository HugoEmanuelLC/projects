// Dependances
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";



// Scripts
export function createToken(params = { id, secretKey, expiresIn: '1h' }) {
    return jwt.sign({ id: params.id }, params.secretKey, { expiresIn: params.expiresIn });
}



export function verifyEmailFormat(params) {
    return new Promise((resolve, reject) => {
        if (params.includes('@')) {
            resolve({ status: 200, message: "email is valid", body: null });
        } else {
            console.log("email is invalid");
            reject({ status: 400, message: "Adresse e-mail invalide", body: null});
        }
    });
}


export async function verifyPassword(result, userInfos, conn) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(userInfos.password, result.info[0][conn.valueTable.colonnePasswordName], (err, isMatch) => {
            if (err) {
                reject({status: 500, message: "server problem", info: err });
            }
            if (isMatch) {
                let token = createToken(
                    {
                        id: result.info[0][conn.valueTable.colonneIdName], 
                        secretKey: conn.valueToken.secretKey, 
                        expiresIn: conn.valueToken?.expiresIn
                    }
                );
                resolve({status: 200, message: "authentification accepted", info: result.info[0], token: token });
            }else{
                reject({status: 400, message: "your email or password is incorrect !", info: isMatch });
            }
        });
    });
}



export async function verifyToken(token="", secretKey="", message = {
    correct: "",
    notCorrect: ""
}) {
    console.log("verifyToken -> token", token);
    return await new Promise((resolve, reject) => {
        token == null || token == "" ? reject({status: 400, message: "token is empty", info: null }) 
        : jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                reject({status: 400, message: message.notCorrect, info: err});
            } else {
                resolve({status: 200, message: message.correct, info: decoded}) 
            }
        });
    });
}










export async function isValidToken(token="", secretKey="", message = {
    correct: "the token is valid",
    notCorrect: "the token is invalid"
}) {
    console.log("isValidToken -> token", token);
    return await new Promise((resolve, reject) => {
        token == null || token == "" ? 
            reject({status: 400, message: "token is empty", infos: null }) 
        : jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                reject({status: 400, message: message.notCorrect, infos: err});
            } else {
                resolve({status: 200, message: message.correct, infos: decoded}) 
            }
        });
    });
}

export function isValidEmail(params) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    re.test(String(params).toLowerCase());
    return new Promise((resolve, reject) => {
        if (re.test(String(params).toLowerCase())) {
            resolve({ 
                status: 200, 
                message: "Adresse e-mail valide", 
                body: null 
            });
        } else {
            reject({ 
                status: 400, 
                message: "Adresse e-mail invalide", 
                body: null
            });
        }
    });
}

export function decryptPassword(values) {
    return new Promise((resolve, reject) => {
        try {
            bcrypt.compare(values.passwordBody, values.passwordBD, (err, isMatch) => {
                if (err) {
                    reject({status: 500, message: "server problem", infos: err });
                }
                if (isMatch) {
                    resolve({status: 200, message: "authentification accepted", infos: values.result.info[0] });
                }else{
                    reject({status: 400, message: "your email or password is incorrect !", infos: isMatch });
                }
            });
        } catch (error) {
            reject({status: 500, message: "server problem", infos: error });
        }
    });
}