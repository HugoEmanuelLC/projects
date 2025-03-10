import * as selectValuesModel from '../models/selectValuesModel.js';



// AUTHENTIFICATION
export const selectValuesAuthFromDBbyEmail = async (req, res, next) => {
    req.body.configDB.tableName = "auth"
    req.body.configDB.colonneName = "email"

    await selectValuesModel.modelSelectFromDB({
        ...req.body.configDB
    })
    .then(data => {
        data.data.length > 0 ? req.body.configDB.infosFromDB = data.data[0] : null;

        req.body.res.status = data.status
        req.body.res.message = data.message
        req.body.res.content = {
            auth: {
                username: data.data[0].username,
                email: data.data[0].email
            }
        }
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

    await selectValuesModel.modelSelectFromDB({
        ...req.body.configDB
    })
    .then(data => {

        data.data.length > 0 ? req.body.configDB.infosFromDB = data.data[0] : null;

        req.body.res.status = data.status
        req.body.res.message = data.message

        req.body.res.content = { 
            auth: {
                username: data.data[0].username,
                email: data.data[0].email
            } 
        }
        next()
    })
    .catch(error => {
        console.log("selectValuesAuthFromDB -> error");
        console.log(error);
        res.status(error.status).json(error)
    }) 
}




// MENUS
export const selectValuesMenusListFromDB = async (req, res, next) => {
    req.body.configDB.tableName = "menus"
    req.body.configDB.colonneName = "fk_auth"
    req.body.configDB.colonneValue = req.body.configDB.infosFromDB._id

    await selectValuesModel.modelSelectFromDB({
        ...req.body.configDB
    })
    .then(data => {
        console.log(data);
        let menus = [];
        data.data.forEach(menu => {
            menus.push({
                _id: menu._id,
                menu_name: menu.menu_name
            })
        })

        req.body.res.status = data.status
        req.body.res.message = data.message
        req.body.res.content = { menus: menus }
        next()
    })
    .catch(error => {
        console.log("selectValuesMenusListFromDB -> error");
        console.log(error);
        res.status(error.status).json(error)
    }) 
}


// PRODUCTS
export const selectValuesProductsListFromMenuFromDB = async (req, res, next) => {
    req.body.configDB.tableName = "products"
    req.body.configDB.colonneName = "fk_menu"
    req.body.configDB.colonneValue = req.params.params

    await selectValuesModel.modelSelectFromDB({
        ...req.body.configDB
    })
    .then(data => {
        let products = [];
        data.data.forEach(product => {
            products.push({
                _id: product._id,
                product_name: product.product_name,
                product_price: product.product_price,
                product_description: product.product_description
            })
        })

        req.body.res.status = data.status
        req.body.res.message = data.message
        req.body.res.content = { products: products }
        next()
    })
    .catch(error => {
        console.log("selectValuesProductsListFromMenuFromDB -> error");
        console.log(error);
        res.status(error.status).json(error)
    }) 
}



// TIMETABLE
export const selectValuesTimeTableFromDB = async (req, res, next) => {
    req.body.configDB.select = `
        timetable._id AS timetable_id, 
        timetable.comment, 
        hours._id AS hours_id, 
        hours.day_name, 
        hours.open, 
        hours.close
    `
    req.body.configDB.tableName = "timetable"
    req.body.configDB.tableName2 = "hours"
    req.body.configDB.colonneName = "timetable._id"
    req.body.configDB.colonneName2 = "hours.fk_timetable"

    await selectValuesModel.modelSelectInnerJoinFromDB({
        ...req.body.configDB
    })
    .then(data => {
        req.body.res.status = data.status
        req.body.res.message = data.message
        req.body.res.content = { timetable: data.data }
        next()
    })
    .catch(error => {
        console.log("selectValuesTimeTableFromDB -> error");
        console.log(error);
        res.status(error.status).json(error)
    }) 
}