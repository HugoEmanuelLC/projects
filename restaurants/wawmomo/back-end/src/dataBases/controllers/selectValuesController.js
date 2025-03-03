import * as selectValuesModel from '../models/selectValuesModel.js';



export const selectValuesAuthFromDB = async (req, res, next) => {
    await selectValuesModel.selectValuesAuthFromDB(req, {
        ...req.body.auth.configDB
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
    await selectValuesModel.selectValuesMenusListFromDB(req, {
        ...req.body.auth.configDB
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
    await selectValuesModel.selectValuesProductsListFromMenuFromDB(req, {
        ...req.body.products.configDB
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