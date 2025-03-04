import * as deleteValuesModel from '../models/deleteValuesModel.js';


export const deleteValuesProductFromDB = async (req, res, next) => {
    req.body.configDB.tableName = "products"
    req.body.configDB.colonneName = "_id"
    req.body.configDB.colonneValue = req.params.params

    await deleteValuesModel.deleteValuesProductFromDB(req, {
        ...req.body.configDB
    })
    .then(data => {
        req.body.res.status = data.status
        req.body.res.message = data.message
        next()
    })
    .catch(error => {
        console.log("deleteValuesProductFromDB -> error");
        console.log(error);
        res.status(error.status).json(error)
    })
}