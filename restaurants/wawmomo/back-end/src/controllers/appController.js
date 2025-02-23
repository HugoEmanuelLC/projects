import * as authController from '../authentication/controllers/authController.js';
import * as emailController from '../emails/controllers/emailController.js';
import connection from '../dbConfigs/mysql.js';
import * as appModels from '../models/appModels.js';
// import {} from "dotenv/config";





export const register = async (req, res) => {
    return await authController.register(req)
    .then(dataAuth => {
        
        let reqBody = { 
            email: req.body.email, 
            urlToVerify: req.body.urlToVerify,
            dataDB: {
                id: dataAuth.info.insertId,
            } 
        }

        emailController.sendLinkVerifyEmail(reqBody)
        .then(dataEmail => {
            res.status(200).json({
                status: 201,
                message: "User registered successfully and email sent",
                DB: dataAuth,
                Email: dataEmail
            });
        })
        .catch(error => {
            console.log("error 2 ------------");
            res.status(error.status).json(error);
        })
    })
    .catch(error => {
        console.log("error 1 ------------");
        res.status(400).json(error)
    });
}



export const verifyEmail = async (req, res) => {
    return await authController.verifyEmail(req.body)
    .then(dataAuth => {
        console.log("dataAuth");
        console.log(dataAuth);
        res.status(200).json({
            status: 200,
            message: "Email verified successfully",
            DB: dataAuth
        });
    })
    .catch(error => {
        console.log("error 1 ------------");
        console.log(error);
        res.status(400).json(error)
    });
}



export const login = async (req, res) => {
    return await authController.login(req.body, res)
    .then(dataAuth => {
        res.status(200).json({
            status: 200,
            message: "User logged in successfully",
            DB: dataAuth
        });
    })
    .catch(error => {
        res.status(400).json(error)
    });
}






export const managerAuthentication = async (req, res) => {
    try {
        
        await authController.isValidEmail(req, res, next)
        .then(()=>console.log("isValidEmail"))
        .catch(error => {
            res.status(400).json(error);
        });

        res.status(200).json({
            status: 200,
            message: "User logged in successfully",
            DB: req.body.content
        });

    } catch (error) {
        console.log("error 1 ------------");
        res.status(400).json(error);
    }
}


export const testContr = async (req, res, next) => {
    await authController.testContr_2(req, res, next)
    .then()
    .catch(error => {
        res.status(400).json(error);
    });
}


export const loginAuthentication = async (req, res, next) => {
    // req.body.email = "admin@admin.com";
    // req.body.password = "admin";
    // req.body.email = req.body.email && req.body.email.trim().toLowerCase();
    // req.body.password = req.body.password && req.body.password.trim();

    // let values = {...appModels.valuesModelBody}
    // values.body.auth.email = req.body.email;
    // values.body.auth.password = req.body.password;

    // console.log("dataAuth");

    await authController.loginAuthentication(req, res, next)
    .then(dataAuth => {
        console.log("loginAuthentication -> dataAuth");
        console.log(dataAuth);
        res.status(dataAuth.status).json(dataAuth);
    })
    .catch(error => {
        console.log("loginAuthentication -> error");
        console.log(error);
        res.status(error.status).json(error);
    });
}

export const verifSession = async (req, res) => {
    let values = {...appModels.valuesModelBody}
    values.valuesTable.colonneEmailName = null;
    values.body.auth.secretKey = process.env.SECRET_TOKEN_KEY;
    values.body.auth.token = req.headers.authorization;

    return await authController.verifSession(values)
    .then(dataAuth => {
        res.status(dataAuth.status).json(dataAuth);
    })
    .catch(error => {
        res.status(error.status).json(error);
    });
}