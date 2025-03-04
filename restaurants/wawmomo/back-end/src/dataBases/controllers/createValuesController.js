import * as createValuesModel from '../models/createValuesModel.js';

export const createValuesMenuInDB = async (req, res, next) => {
    req.body.configDB.tableName = "menus"
    req.body.configDB.colonneName = ["fk_auth", "menu_name"]
    req.body.configDB.colonneValue = req.body.menu

    await createValuesModel.createValuesMenuInDB(req, {
        ...req.body.configDB
    })
    .then(data => {
        req.body.res.status = data.status
        req.body.res.message = data.message
        next()
    })
    .catch(error => {
        console.log("createValuesMenuInDB -> error");
        console.log(error);
        res.status(error.status).json(error)
    })
}




export const createValuesProductInDB = async (req, res, next) => {
    req.body.configDB.tableName = "products"
    req.body.configDB.colonneName = ["fk_auth", "fk_menu", "product_name", "product_price", "product_description"]
    req.body.configDB.colonneValue = req.body.product

    await createValuesModel.createValuesProductInDB(req, {
        ...req.body.configDB
    })
    .then(data => {
        req.body.res.status = data.status
        req.body.res.message = data.message
        next()
    })
    .catch(error => {
        console.log("createValuesProductInDB -> error");
        console.log(error);
        res.status(error.status).json(error)
    })
}