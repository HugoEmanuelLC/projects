// Dependances
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";



// Scripts




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
    return await new Promise((resolve, reject) => {
        token == null || token == "" ? reject({status: 400, message: "token is empty", info: null }) 
        : jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                console.log("verifyToken -> err");
                console.log(err);
                reject({status: 400, message: message.notCorrect});
            } else {
                resolve({status: 200, message: message.correct, content: decoded}) 
            }
        });
    });
}































export function isValidEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    re.test(String(email).toLowerCase());
    return new Promise((resolve, reject) => {
        if (re.test(String(email).toLowerCase())) {
            return resolve({ 
                status: 200, 
                message: "Adresse e-mail valide"
            });
        } else {
            console.log("isValidEmail not ok");
            return reject({ 
                status: 400, 
                message: "Adresse e-mail invalide"
            });
        }
    });
}



export async function decryptPassword(values) {
    return new Promise((resolve, reject) => {
        if (values.dbPassword == "admin" && values.postPassword == "admin") {
            resolve({status: 200, message: "possword decrypt" });
            
        } else {
            try {
                bcrypt.compare(values.postPassword, values.dbPassword, (err, isMatch) => {
                    if (err) {
                        console.log("decryptPassword -> err");
                        console.log(err);
                        reject({status: 500, message: "server problem" });
                    }
                    if (isMatch) {
                        console.log("decryptPassword -> isMatch");
                        resolve({ status: 200, message: "possword decrypt" });
                    }else{
                        console.log("decryptPassword -> catch");
                        reject({status: 400, message: "password incorrect !" });
                    }
                });
            } catch (error) {
                console.log("decryptPassword catch -> error");
                console.log(error);
                reject({status: 500, message: error.message });
            }
        }
    });
}



export function createToken(req, params = { id, secretKey, expiresIn: '1h' }) {
    req.body.res.message = "authentification accepted";
    return jwt.sign({ id: params.id }, params.secretKey, { expiresIn: params.expiresIn });
}



export async function isValidToken(req, token="", secretKey="", message = {
    correct: "the token is valid",
    notCorrect: "the token is invalid"
}) {
    return await new Promise((resolve, reject) => {
        token == null || token == "" ? 
            reject({status: 400, message: "token is empty", infos: null }) 
        : jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                reject({status: 400, message: message.notCorrect, infos: err});
            } else {
                req.body.auth.configDB.colonneValue = decoded.id;
                console.log("isValidToken -> decoded");
                console.log(req.body.auth.configDB);
                resolve({status: 200, message: message.correct}) 
            }
        });
    });
}