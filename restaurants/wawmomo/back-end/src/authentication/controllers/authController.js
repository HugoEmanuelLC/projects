// import * as authModel from "../models/authModel.js";
import {} from "dotenv/config";
// Scripts
import * as main from "../scripts/main.js";
import * as script from "../scripts/script.js";


// export const register = async (req) => {
//     return await new Promise((resolve, reject) => {
//         authModel.register(req)
//         .then(dataAuth => {
//             resolve(dataAuth);
//         })
//         .catch(error => {
//             console.log("register -> error");
//             reject(error);
//         })
//     });
// };



// export const verifyEmail = async (req) => {
//     return await new Promise((resolve, reject) => {
//         authModel.verifyEmails(req)
//         .then(dataAuth => {
//             resolve(dataAuth);
//         })
//         .catch(error => {
//             reject(error);
//         })
//     });
// }



// export const login = async (req) => {
//     return await new Promise((resolve, reject) => {
//         authModel.login(req)
//         .then(dataAuth => {
//             resolve(dataAuth);
//         })
//         .catch(error => {
//             reject(error);
//         })
//     });
// }








export const isValidEmail = async (req, res, next) => {
    await script.isValidEmail(req.body.auth.email)
    .then(data => {
        req.body.res.status = data.status
        req.body.res.message = data.message

        console.log("isValidEmail -> data 1 -------");
        console.log(req.body.res);
        
        next()
    })
    .catch(error => {
        console.log("isValidEmail -> error");
        console.log(error);
        res.status(error.status).json(error)
    }) 
};



export const isValidPassword = async (req, res, next) => {
    let values = {
        postPassword: req.body.auth.password,
        dbPassword: req.body.auth.infosFromDB.password,
    }

    await script.decryptPassword(values)
    .then(data => {
        req.body.res.status = data.status
        req.body.res.message = data.message
        next()
    })
    .catch(error => {
        console.log("isValidPassword -> error");
        console.log(error);
        res.status(error.status).json(error)
    }) 
}



export const createToken = async (req, res, next) => {
    let values = {
        id: req.body.auth.infosFromDB._id,
        secretKey: process.env.SECRET_TOKEN_KEY,
        expiresIn: "24h"
    }

    let token = script.createToken(req, values)
    
    console.log("createToken -> req.body.res.message");
    
    req.body.res.token = token
    
    // console.log(req.body.res.token);
    next()
}



export const isValidToken = async (req, res, next) => {
    return await script.isValidToken(
        req,
        req.headers.authorization,
        process.env.SECRET_TOKEN_KEY,
        {
            correct: "the token is valid",
            notCorrect: "the token is invalid"
        }
    )
    .then(data => {
        console.log("isValidToken -> data");
        console.log(data);
        req.body.res.status = data.status
        req.body.res.message = data.message
        next()
    })
    .catch(error => {
        console.log("isValidToken -> error");
        console.log(error);
        res.status(error.status).json(error)
    })
}

// export const sendToken = async (req, res, next) => {

//     console.log("req.body.res.content.authInfos");
//     console.log(req.body.res.content.configToken);

//     await script.createToken(req.body.res.content.configToken)
//     .then(data => {
//         res.status(data.status).json(data)
//     })
//     .catch(error => {
//         console.log("sendToken -> error");
//         console.log(error);
//         res.status(error.status).json(error)
//     })
// }









export const testContr_2 = async (req, res, next) => {
    return await new Promise((resolve, reject) => {
        let tst = false;
        tst ? 
        next() :
        reject({status: 400, message: "your email or password is incorrect !", info: "isMatch"})
    })
}


export const loginAuthentication = async (req, res, next) => {
    return await new Promise((resolve, reject) => {
        main.verifLoginAuthentication(req, res, next)
        .then(data => {
            // resolve(data);
            next();
        })
        .catch(error => {
            reject(error);
        }) 
        // resolve({status: 200, message: "authentification accepted", info: "result.info[0]", token: "token"});
    });
}

// export const verifSession = async (values) => {
//     return await new Promise((resolve, reject) => {
//         authModel.verifSession(values)
//         .then(dataAuth => {
//             resolve(dataAuth);
//         })
//         .catch(error => {
//             reject(error);
//         })
//     }); 
// };












// export const testVerifyAuth = (req, res) => authModel.verifyAuth(req, res);
// export const sendLinkForgotPassword = (req, res) => authModel.sendLinkForgotPassword(req, res);
// export const sendRecoverPassword = (req, res) => authModel.sendRecoverPassword(req, res);
// export const sendNewPassword = (req, res) => authModel.sendNewPassword(req, res);