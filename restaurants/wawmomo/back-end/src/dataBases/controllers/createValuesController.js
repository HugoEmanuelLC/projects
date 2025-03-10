import * as createValuesModel from '../models/createValuesModel.js';



export const createValuesMenuInDB = async (req, res, next) => {
    let SETvalues = ""
    req.body.configDB.tableName = "menus"
    req.body.configDB.colonneName = ["fk_auth", "menu_name"]
    req.body.configDB.colonneValue = req.body.configDB.infosFromDB._id

    req.body.configDB.colonneName.forEach((element, index) => {
        element !== req.body.configDB.colonneName[0] ?
        SETvalues += `"${req.body.menu[element]}"${index < req.body.configDB.colonneName.length - 1 ? ", " : ""}`
        : SETvalues += `${req.body.configDB.infosFromDB._id}${index < req.body.configDB.colonneName.length - 1 ? ", " : ""}`
    })

    req.body.configDB.SETvalues = SETvalues

    await createValuesModel.modelCreateFromDB({
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
    let SETvalues = ""
    req.body.configDB.tableName = "products"
    req.body.configDB.colonneName = ["fk_menu", "fk_auth", "product_name", "product_price", "product_description"]
    req.body.configDB.colonneValue = req.body.product

    req.body.configDB.colonneName.forEach((element, index) => {
        element === req.body.configDB.colonneName[1] ? 
            SETvalues += `${req.body.configDB.infosFromDB._id}${index < req.body.configDB.colonneName.length - 1 ? ", " : ""}`
        : element !== req.body.configDB.colonneName[0] ?
            SETvalues += `"${req.body.product[element]}"${index < req.body.configDB.colonneName.length - 1 ? ", " : ""}`
        : SETvalues += `${req.params.params}${index < req.body.configDB.colonneName.length - 1 ? ", " : ""}`
    })

    req.body.configDB.SETvalues = SETvalues
    
    console.log("createValuesMenuInDB -> req.body.configDB");
    console.log(req.body);

    await createValuesModel.modelCreateFromDB({
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




export const createValuesTimeTableDayInDB = async (req, res, next) => {
    let SETvalues = ""
    req.body.configDB.tableName = "hours"
    req.body.configDB.colonneName = ["fk_timetable", "fk_auth", "day", "start", "end"]
    req.body.configDB.colonneValue = req.body.timeTable

    req.body.configDB.colonneName.forEach((element, index) => {
        element === req.body.configDB.colonneName[1] ? 
            SETvalues += `${req.body.configDB.infosFromDB._id}${index < req.body.configDB.colonneName.length - 1 ? ", " : ""}`
        : element === req.body.configDB.colonneName[0] ?
            SETvalues += `${req.params.params}${index < req.body.configDB.colonneName.length - 1 ? ", " : ""}`
        : SETvalues += `"${req.body.timeTable[element]}"${index < req.body.configDB.colonneName.length - 1 ? ", " : ""}`
    })

    req.body.configDB.SETvalues = SETvalues

    console.log("createValuesTimeTableDayInDB -> req.body.configDB");
    console.log(req.body);

    await createValuesModel.modelCreateFromDB({
        ...req.body.configDB
    })
    .then(data => {
        req.body.res.status = data.status
        req.body.res.message = data.message
        next()
    })
    .catch(error => {
        console.log("createValuesTimeTableDayInDB -> error");
        console.log(error);
        res.status(error.status).json(error)
    })
}