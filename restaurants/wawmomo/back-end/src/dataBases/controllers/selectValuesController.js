import * as selectValuesModel from '../models/selectValuesModel.js';



export const selectValuesAuthFromDBbyEmail = async (req, res, next) => {
    req.body.configDB.tableName = "auth"
    req.body.configDB.colonneName = "email"

    await selectValuesModel.selectValuesAuthFromDB(req, {
        ...req.body.configDB
    })
    .then(data => {
        req.body.res.status = data.status
        req.body.res.message = data.message
        req.body.res.content.auth = data.auth
        next()
    })
    .catch(error => {
        console.log("selectValuesAuthFromDB -> error");
        console.log(error);
        res.status(error.status).json(error)
    }) 
}


export const selectValuesAuthFromDBbyId = async (req, res, next) => {
    req.body.configDB.tableName = "auth"
    req.body.configDB.colonneName = "_id"

    await selectValuesModel.selectValuesAuthFromDB(req, {
        ...req.body.configDB
    })
    .then(data => {
        req.body.res.status = data.status
        req.body.res.message = data.message
        req.body.res.content = { auth: data.auth }
        next()
    })
    .catch(error => {
        console.log("selectValuesAuthFromDB -> error");
        console.log(error);
        res.status(error.status).json(error)
    }) 
}


export const selectValuesMenusListFromDB = async (req, res, next) => {
    req.body.configDB.tableName = "menus"
    req.body.configDB.colonneName = "fk_auth"
    req.body.configDB.colonneValue = req.body.configDB.infosFromDB._id

    await selectValuesModel.selectValuesMenusListFromDB(req, {
        ...req.body.configDB
    })
    .then(data => {
        req.body.res.status = data.status
        req.body.res.message = data.message
        req.body.res.content = { menus: data.menus }
        next()
    })
    .catch(error => {
        console.log("selectValuesMenusListFromDB -> error");
        console.log(error);
        res.status(error.status).json(error)
    }) 
}


export const selectValuesProductsListFromMenuFromDB = async (req, res, next) => {
    req.body.configDB.tableName = "products"
    req.body.configDB.colonneName = "fk_menu"
    req.body.configDB.colonneValue = req.params.params

    await selectValuesModel.selectValuesProductsListFromMenuFromDB(req, {
        ...req.body.configDB
    })
    .then(data => {
        req.body.res.status = data.status
        req.body.res.message = data.message
        req.body.res.content = { products: data.products }
        next()
    })
    .catch(error => {
        console.log("selectValuesProductsListFromMenuFromDB -> error");
        console.log(error);
        res.status(error.status).json(error)
    }) 
}