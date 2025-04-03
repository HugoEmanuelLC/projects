// Dependencies
import { Router } from "express"

// Controllers
import * as selectValuesController from '../dataBases/controllers/selectValuesController.js'


const route = Router()


const list = [
    { url: "/menus/select", method: "GET", description: "Select menus" },
    { url: "/products/select/:params", method: "GET", description: "Select products" },
    { url: "/time-table/select", method: "GET", description: "Select time-table" }
]




// Middlewares
function modelObjectBodyForSessionForReq(req, res, next){
    req.body.configDB = { tableName: null, colonneName: null, colonneValue: null, infosFromDB: {} } 
    req.body.configToken = { secretKey: null, expiresIn: null }
    req.body.res = { status: 0, message: "", content: { menus: {}, products: {}, timetable: {} } }
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



route.use( modelObjectBodyForSessionForReq )
route.get('/', (req, res) => res.status(200).json({ message: "List d'access", list: list }) )



// Menus
route.get('/menus-list', 
    selectValuesController.selectValuesAllMenusListFromDB, modelFncForSendResToClient 
)


// Products
route.get('/products-from-menu/:params', 
    selectValuesController.selectValuesProductsListFromMenuFromDB, modelFncForSendResToClient 
)


// TimeTable
route.get('/timetable-list', 
    selectValuesController.selectValuesTimeTableFromDB, modelFncForSendResToClient 
)


// Images
route.get('/images-list',
    selectValuesController.selectValuesImagesAllListFromDB, modelFncForSendResToClient
)



export default route