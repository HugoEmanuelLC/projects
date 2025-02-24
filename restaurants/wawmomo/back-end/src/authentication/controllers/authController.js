// import * as authModel from "../models/authModel.js";
import {} from "dotenv/config";
// Scripts
import * as script from "../scripts/script.js";



export const isValidEmail = async (req, res, next) => {
    await script.isValidEmail(req, req.body.auth.email)
    .then(data => {
        req.body.res.status = data.status
        req.body.res.message = data.message
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
    
    req.body.res.token = token
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



// export const testVerifyAuth = (req, res) => authModel.verifyAuth(req, res);
// export const sendLinkForgotPassword = (req, res) => authModel.sendLinkForgotPassword(req, res);
// export const sendRecoverPassword = (req, res) => authModel.sendRecoverPassword(req, res);
// export const sendNewPassword = (req, res) => authModel.sendNewPassword(req, res);