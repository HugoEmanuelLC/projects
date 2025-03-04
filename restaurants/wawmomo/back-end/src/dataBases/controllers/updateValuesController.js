import * as updateValuesModel from '../models/updateValuesModel.js';



export const updateValuesAuthPasswordFromDB = async (req, res, next) => {
    req.body.configDB.tableName = "auth"
    req.body.configDB.colonneName = { id: "_id", password: "password" }
    req.body.configDB.colonneValue = req.body.auth.password

    await updateValuesModel.updateValuesAuthPasswordFromDB(req, {
        ...req.body.configDB
    })
    .then(data => {
        req.body.res.status = data.status
        req.body.res.message = data.message
        req.body.res.content = { auth: data.auth }
        next()
    })
    .catch(error => {
        console.log("updateValuesAuthPasswordFromDB -> error");
        console.log(error);
        res.status(error.status).json(error)
    }) 
}


export const updateValuesMenuFromDB = async (req, res, next) => {
    req.body.configDB.tableName = "menus"
    req.body.configDB.colonneName = ["_id", "menu_name"]
    req.body.configDB.colonneValue = req.params.params

    await updateValuesModel.updateValuesMenuFromDB(req, {
        ...req.body.configDB
    })
    .then(data => {
        req.body.res.status = data.status
        req.body.res.message = data.message
        req.body.res.content = { menu: data.menu }
        next()
    })
    .catch(error => {
        console.log("updateValuesMenuFromDB -> error");
        console.log(error);
        res.status(error.status).json(error)
    }) 
}


export const updateValuesProduitFromDB = async (req, res, next) => {
    req.body.configDB.tableName = "products"
    req.body.configDB.colonneName = ["_id", "product_name", "product_description", "product_price"]
    req.body.configDB.colonneValue = req.params.params

    await updateValuesModel.updateValuesProduitFromDB(req, {
        ...req.body.configDB
    })
    .then(data => {
        req.body.res.status = data.status
        req.body.res.message = data.message
        req.body.res.content = { produit: data.produit }
        next()
    })
    .catch(error => {
        console.log("updateValuesProduitFromDB -> error");
        console.log(error);
        res.status(error.status).json(error)
    }) 
}