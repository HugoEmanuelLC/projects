import * as getValuesModel from '../models/getValuesModel.js';



export const getValuesAuthFromDB = async (req, res, next) => {
    await getValuesModel.getValuesAuthFromDB(req, {
        ...req.body.auth.configDB
    })
    .then(data => {
        req.body.res.status = data.status
        req.body.res.message = data.message
        req.body.res.content = { auth: data.auth }
        next()
    })
    .catch(error => {
        console.log("getValuesAuthFromDB -> error");
        console.log(error);
        res.status(error.status).json(error)
    }) 
}