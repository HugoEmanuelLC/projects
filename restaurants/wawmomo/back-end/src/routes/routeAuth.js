// Dependencies
import { Router } from "express"
// Controllers
import * as authController from '../authentication/controllers/authController.js'
import * as getValuesController from '../dbValues/controllers/getValuesController.js'
import * as emailController from '../emails/controllers/emailController.js'
// import * as emailController from '../emails/controllers/emailController.js'

const routeAuth = Router()

const list = [
    { name: "login", url: "/auth/login", method: "POST" },
    { name: "verif-session", url: "/auth/verif-session", method: "POST" },
    { name: "forgot-password", url: "/auth/forgot-password", method: "POST" },
    { name: "recover-password", url: "/auth/recover-password", method: "GET" },
    { name: "update-password", url: "/auth/update-password", method: "GET" },
    { name: "verify-email-forget-password", url: "/auth/verify-email-forget-password", method: "GET" }
]

let exempleModelReqForFnc = {
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

function modelObjectBodyForSessionForReq(req, res, next){
    req.body = { 
        auth: { 
            configDB: { tableName: "auth", colonneName: "_id", colonneValue: null },
            infosFromDB: {} 
        },
        res: { status: 0, message: "", token: "", content: {
                // auth: {}
                // userInfos: {}
                // menusList: {}
                // menuItem: {}
                // productsList: {}
                // timeTable: {}
            }
        }
    }
    next()
}

function modelFncForSendResToClient(req, res) {
    res.status(req.body.res.status).json({
        status: req.body.res.status,
        message: req.body.res.message,
        content: {...req.body.res.content},
        token: req.body.res.token
    })
}

routeAuth.get('/', (req, res) => res.status(200).json({ message: "List d'authentication:", list: list }) )

routeAuth.post('/login', (req, res, next) => {
        req.body.auth.configDB = { tableName: "auth", colonneName: "email", colonneValue: null }
        req.body.res = { status: 0, message: "", token: "", content: { auth: {} } }
        next()
    },
    authController.isValidEmail, getValuesController.getValuesAuthFromDB, authController.isValidPassword,
    authController.createToken, modelFncForSendResToClient
)

routeAuth.post('/forgot-password', (req, res, next) => {
    
    // zonne de test--------------
        // req.body = { auth: {}}
        // req.body.auth.email = "helc85.info@gmail.com"
        // req.body.auth.urlToVerify = "http://localhost:8080/auth/update-password"
    // zonne de test--------------

        req.body.auth.configDB = { tableName: "auth", colonneName: "email", colonneValue: null }
        req.body.res = { status: 0, message: "", token: "", content: { auth: {} } }
        next()
    },
    authController.isValidEmail, getValuesController.getValuesAuthFromDB, authController.createToken,
    emailController.sendEmailForVerification, 
    (req, res, next) => {req.body.res.token = null; req.body.res.content = null; next()},
    modelFncForSendResToClient 
)

// for all routes below, the token must be present in the header
routeAuth.use( modelObjectBodyForSessionForReq, authController.isValidToken, getValuesController.getValuesAuthFromDB )

routeAuth.post('/verif-session', authController.createToken, modelFncForSendResToClient )

// routeAuth.get('/recover-password', emailController.recoverPassword, modelFncForSendResToClient )
// routeAuth.get('/update-password', emailController.updatePassword, modelFncForSendResToClient )
// routeAuth.get('/verify-email-forget-password', emailController.verifyEmailForgetPassword, modelFncForSendResToClient )

// routeAuth.get('/user-infos', getValuesController.getValuesUserInfosFromDB, modelFncForSendResToClient )
// routeAuth.put('/user-infos', updateValuesController.updateValuesUserInfosFromDB, modelFncForSendResToClient )
// routeAuth.post('/user-infos', insertValuesController.insertValuesUserInfosFromDB, modelFncForSendResToClient )
// routeAuth.delete('/user-infos', deleteValuesController.deleteValuesUserInfosFromDB, modelFncForSendResToClient )

// routeAuth.get('/menus-list', getValuesController.getValuesMenusListFromDB, modelFncForSendResToClient )
// routeAuth.get('/menu/:params', getValuesController.getValuesMenuItemFromDB, modelFncForSendResToClient )
// routeAuth.put('/menu/:params', updateValuesController.updateValuesMenuItemFromDB, modelFncForSendResToClient )
// routeAuth.post('/menu/:params', insertValuesController.insertValuesMenuItemFromDB, modelFncForSendResToClient )
// routeAuth.delete('/menu/:params', deleteValuesController.deleteValuesMenuItemFromDB, modelFncForSendResToClient )

// routeAuth.get('/products_list', getValuesController.getValuesProductsListFromDB, modelFncForSendResToClient )
// routeAuth.get('/product/:params', getValuesController.getValuesProductFromDB, modelFncForSendResToClient )
// routeAuth.put('/product/:params', updateValuesController.updateValuesProductFromDB, modelFncForSendResToClient )
// routeAuth.post('/product/:params', insertValuesController.insertValuesProductFromDB, modelFncForSendResToClient )
// routeAuth.delete('/product/:params', deleteValuesController.deleteValuesProductFromDB, modelFncForSendResToClient )

// routeAuth.get('/time-table', getValuesController.getValuesTimeTableFromDB, modelFncForSendResToClient )
// routeAuth.put('/time-table', updateValuesController.updateValuesTimeTableFromDB, modelFncForSendResToClient )
// routeAuth.post('/time-table', insertValuesController.insertValuesTimeTableFromDB, modelFncForSendResToClient )
// routeAuth.delete('/time-table', deleteValuesController.deleteValuesTimeTableFromDB, modelFncForSendResToClient )

export default routeAuth