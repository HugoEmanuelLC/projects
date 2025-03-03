// Dependencies
import { Router } from "express"
import {} from 'dotenv/config'
// Controllers
import * as authController from '../authentication/controllers/authController.js'
import * as selectValuesController from '../dataBases/controllers/selectValuesController.js'
import * as updateValuesController from '../dataBases/controllers/updateValuesController.js'
// import * as insertValuesController from '../dataBases/controllers/insertValuesController.js'
// import * as deleteValuesController from '../dataBases/controllers/deleteValuesController.js'
import * as emailController from '../emails/controllers/emailController.js'


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
            infosFromDB: {},
            configToken: { secretKey: null, expiresIn: null }
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
        req.body.auth.configToken = { secretKey: null, expiresIn: null }
        req.body.res = { status: 0, message: "", token: "", content: { auth: {} } }
        next()
    },
    authController.isValidEmail, selectValuesController.selectValuesAuthFromDB, authController.isValidPassword,
    authController.createToken, modelFncForSendResToClient
)



routeAuth.post('/forgot-password', (req, res, next) => {
        req.body.auth.configDB = { tableName: "auth", colonneName: "email", colonneValue: null }
        req.body.auth.configToken = { secretKey: process.env.SECRET_KEY, expiresIn: "1h" }
        req.body.res = { status: 0, message: "", token: "", content: { auth: {} } }
        next()
    },
    authController.isValidEmail, selectValuesController.selectValuesAuthFromDB, authController.createToken,
    emailController.sendEmailForVerification, 
    (req, res, next) => {req.body.res.token = null; req.body.res.content = null; next()},
    modelFncForSendResToClient 
)



routeAuth.post('/update-password', (req, res, next) => {
    req.body.auth.configDB = { tableName: "auth", colonneName: "_id", colonneValue: null }
    req.body.auth.configToken = { secretKey: process.env.SECRET_KEY, expiresIn: null }
    req.body.res = { status: 0, message: "", token: "", content: { auth: {} } }
    next()
},
authController.isValidToken, selectValuesController.selectValuesAuthFromDB, authController.hashPassword,
( req, res, next ) => {
    req.body.auth.configDB = { tableName: "auth", colonneName: { id: "_id", password: "password" }, 
        colonneValue: req.body.auth.password }
    next()
},
updateValuesController.updateValuesAuthFromDB, modelFncForSendResToClient 
)



// for all routes below, the token must be present in the header
routeAuth.use( modelObjectBodyForSessionForReq, authController.isValidToken, selectValuesController.selectValuesAuthFromDB )

routeAuth.post('/verif-session', authController.createToken, modelFncForSendResToClient )



// routeAuth.get('/user-infos', selectValuesController.getValuesUserInfosFromDB, modelFncForSendResToClient )
// routeAuth.put('/user-infos', updateValuesController.updateValuesUserInfosFromDB, modelFncForSendResToClient )
// routeAuth.post('/user-infos', insertValuesController.insertValuesUserInfosFromDB, modelFncForSendResToClient )
// routeAuth.delete('/user-infos', deleteValuesController.deleteValuesUserInfosFromDB, modelFncForSendResToClient )


routeAuth.get('/menus/select', 
    (req, res, next) => {
        req.body.auth.configDB = { tableName: "menus", colonneName: "fk_auth", colonneValue: req.body.auth.infosFromDB._id }
        req.body.res = { status: 0, message: "", token: "", content: { menusList: {} } }
        next()
    }, selectValuesController.selectValuesMenusListFromDB, modelFncForSendResToClient 
)


routeAuth.get('/products/select/:params', 
    (req, res, next) => {
        req.body.auth.configDB = { tableName: "products", colonneName: "fk_menu", colonneValue: req.params.params }
        req.body.res = { status: 0, message: "", token: "", content: { menusList: {} } }
        next()
    }, selectValuesController.selectValuesProductsListFromMenuFromDB, modelFncForSendResToClient 
)


// routeAuth.put('/product/update/:params', 
//     (req, res, next) => {
//         req.body.auth.configDB = { tableName: "products", colonneName: "_id", colonneValue: req.params.params }
//         req.body.res = { status: 0, message: "", token: "", content: { menuItem: {} } }
//         next()
//     },
//     updateValuesController.updateValuesMenuItemFromDB, modelFncForSendResToClient
// )

// routeAuth.put('/menu/:params', updateValuesController.updateValuesMenuItemFromDB, modelFncForSendResToClient )
// routeAuth.post('/menu/:params', insertValuesController.insertValuesMenuItemFromDB, modelFncForSendResToClient )
// routeAuth.delete('/menu/:params', deleteValuesController.deleteValuesMenuItemFromDB, modelFncForSendResToClient )

// routeAuth.get('/products_list', selectValuesController.getValuesProductsListFromDB, modelFncForSendResToClient )
// routeAuth.get('/product/:params', selectValuesController.getValuesProductFromDB, modelFncForSendResToClient )
// routeAuth.put('/product/:params', updateValuesController.updateValuesProductFromDB, modelFncForSendResToClient )
// routeAuth.post('/product/:params', insertValuesController.insertValuesProductFromDB, modelFncForSendResToClient )
// routeAuth.delete('/product/:params', deleteValuesController.deleteValuesProductFromDB, modelFncForSendResToClient )

// routeAuth.get('/time-table', selectValuesController.getValuesTimeTableFromDB, modelFncForSendResToClient )
// routeAuth.put('/time-table', updateValuesController.updateValuesTimeTableFromDB, modelFncForSendResToClient )
// routeAuth.post('/time-table', insertValuesController.insertValuesTimeTableFromDB, modelFncForSendResToClient )
// routeAuth.delete('/time-table', deleteValuesController.deleteValuesTimeTableFromDB, modelFncForSendResToClient )

export default routeAuth