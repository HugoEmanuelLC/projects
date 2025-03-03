import * as updateValuesModel from '../models/updateValuesModel.js';



export const updateValuesAuthFromDB = async (req, res, next) => {
    await updateValuesModel.updateValuesAuthFromDB(req, {
        ...req.body.auth.configDB
    })
    .then(data => {
        req.body.res.status = data.status
        req.body.res.message = data.message
        req.body.res.content = { auth: data.auth }
        next()
    })
    .catch(error => {
        console.log("updateValuesAuthFromDB -> error");
        console.log(error);
        res.status(error.status).json(error)
    }) 
}


export const updateValuesProduitFromDB = async (req, res, next) => {
    await updateValuesModel.updateValuesProduitFromDB(req, {
        ...req.body.products.configDB
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