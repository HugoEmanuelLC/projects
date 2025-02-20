import * as authController from '../authentication/controllers/authController.js';
import * as emailController from '../emails/controllers/emailController.js';
import connection from '../dbConfigs/mysql.js';
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












export const loginAuthentication = async (req, res) => {
    // req.body.email = "admin@admin.com";
    // req.body.password = "admin";
    req.body.email = req.body.email.trim();
    req.body.password = req.body.password.toLowerCase();

    let values = {
        body: req.body,
        connection,
        valuesTable: {
            tableAuthName:"auth",
            colonneEmailName: "email",
            colonneIdName: "_id",
        }
    }

    // console.log("values in appController");
    // console.log(connDB);
    // res.json({values});

    return await authController.loginAuthentication(values)
    .then(dataAuth => {
        res.status(dataAuth.status).json(dataAuth);
    })
    .catch(error => {
        res.status(error.status).json(error);
    });
}

export const verifSession = async (req, res) => {
    // req.body.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAyNCwiaWF0IjoxNzQwMDQ5ODM4LCJleHAiOjE3NDAwNTM0Mzh9.OaaPz19JrdIkgxT1xjnoSRpxAnfDW4z6-d0SOEUUSr8";
    req.body.secretKey = process.env.SECRET_TOKEN_KEY;
    req.body.token = req.headers.authorization;

    let values = {
        body: req.body,
        connection,
        valuesTable: {
            tableAuthName:"auth",
            colonneEmailName: null,
            colonneIdName: "_id",
        }
    }

    // console.log("values in appController");
    // console.log(values);

    return await authController.verifSession(values)
    .then(dataAuth => {
        res.status(dataAuth.status).json(dataAuth);
    })
    .catch(error => {
        res.status(error.status).json(error);
    });
}