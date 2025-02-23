// Dependencies
import { Router } from "express"
// Controllers
import * as authController from '../authentication/controllers/authController.js'
import * as getValuesController from '../dbValues/controllers/getValuesController.js'

// import * as appController from '../controllers/appController.js'
// import * as emailController from '../emails/controllers/emailController.js'

const routeAuth = Router()

const list = [
    {
        name: "register",
        url: "/auth/register",
        method: "POST"
    },
    {
        name: "login",
        url: "/auth/login",
        method: "POST"
    },
    {
        name: "verify-auth",
        url: "/auth/verify-auth",
        method: "GET"
    },
    {
        name: "forgot-password",
        url: "/auth/forgot-password",
        method: "POST"
    },
    {
        name: "recover-password",
        url: "/auth/recover-password",
        method: "GET"
    },
    {
        name: "update-password",
        url: "/auth/update-password",
        method: "GET"
    },
    {
        name: "verify-email-register",
        url: "/auth/verify-email-register",
        method: "GET"
    },
    {
        name: "verify-email-forget-password",
        url: "/auth/verify-email-forget-password",
        method: "GET"
    }
]

// get's tests
routeAuth.get('/', (req, res) => {
    res.status(200).json({ message: "List d'authentication:", list: list })
})



let modelRes = {
    status: 200,
    message: "",
    token: "",
    content: {
        auth: {}
    }
}

let modelReq = {
    auth: {
        id: 0,
        email: "",
        password: "",
        configDB: {
            tableName: "",
            colonneName: "",
            colonneValue: ""
        },
        infosFromDB: {}
    }
}



routeAuth.post('/login', 
    (req, res, next) => {
        // req.body = {
        //     auth: {
        //         // email: "admin@admin.com",
        //         // password: "admin",
        //         configDB: {
        //             tableName: "auth",
        //             colonneName: "email",
        //             colonneValue: "admin@admin.com"
        //         }
        //     },
        //     res: {}
        // }
        req.body.auth.configDB = {
            tableName: "auth",
            colonneName: "email",
            colonneValue: "admin@admin.com"
        }
        req.body.res = {
            status: 0,
            message: "",
            token: "",
            content: {}
        }
        next()
    },
    authController.isValidEmail,
    getValuesController.getValuesAuthFromDB,
    authController.isValidPassword,
    authController.createToken,
    (req, res) => {
        res.status(req.body.res.status).json({
            message: req.body.res.message,
            content: {...req.body.res.content},
            token: req.body.res.token
        })
    }
)



routeAuth.post('/verif-session', 
    (req, res, next) => {
        // req.headers.authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAyNCwiaWF0IjoxNzQwMzI3OTg2LCJleHAiOjE3NDA0MTQzODZ9.Ww9TP4X-lvzUVvjzSYk9pRiwc0A3M475slclrUI0bds"
        req.body = {
            auth: {
                configDB: {
                    tableName: "auth",
                    colonneName: "_id",
                    colonneValue: 0
                }
            },
            res: {}
        }
        next()
    },

    authController.isValidToken,
    getValuesController.getValuesAuthFromDB,
    authController.createToken,

    (req, res) => {
        res.status(req.body.res.status).json({
            message: req.body.res.message,
            content: {...req.body.res.content},
            token: req.body.res.token
        })
    }
)

// routeAuth.get('/verif-session/:params', authController.verifSession, appController.getAuthInfos, appController.getUserInfos)


export default routeAuth