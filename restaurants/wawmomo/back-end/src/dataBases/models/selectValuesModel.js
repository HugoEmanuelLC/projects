import connection from "../dbConfigs/mysql.js";



/**
 * @param {object} req req.body.auth.infosFromDB = result[0]
 * @param {object} values values.tableName, values.colonneName, values.colonneValue
 * @returns {Promise} status, message, auth { username, password } + req.body.auth.infosFromDB = result[0]
 */
export async function selectValuesAuthFromDB(req, values){
    return new Promise((resolve, reject) => {
        try {
            connection.query(
                `SELECT * FROM ${values.tableName} WHERE ${values.colonneName} = ?`, values.colonneValue,
                (err, result) => {
                    if (err) {
                        console.log("selectAuthDBValues error");
                        console.log(err);
                        return reject({
                            status: 500, 
                            message: "server problem, sql error"
                        });
                    }

                    result.length > 0 ? req.body.auth.infosFromDB = result[0] : null;

                    if (result.length > 0) {
                        resolve({
                            status: 200, 
                            message: "user found",
                            auth: {
                                username: result[0].username,
                                email: result[0].email,
                            }
                        })

                    } else {
                        reject({
                            status: 400, 
                            message: "user not found"
                        });
                    }
            });
        } catch (error) {
            console.log("selectAuthDBValues error");
            console.log(error);
            reject({status: 500, message: "server problem, table sql error"});
        }
    });
} 



// export async function selectValuesUserInfosFromDB(req, values){}



export async function selectValuesMenusListFromDB(req, values){
    return new Promise((resolve, reject) => {
        try {
            connection.query(
                `SELECT * FROM ${values.tableName} WHERE ${values.colonneName} = ?`, values.colonneValue,
                (err, result) => {
                    if (err) {
                        console.log("selectValuesMenusListFromDB error");
                        console.log(err);
                        return reject({
                            status: 500, 
                            message: "server problem, sql error"
                        });
                    }

                    if (result.length > 0) {
                        resolve({
                            status: 200, 
                            message: "menus found",
                            menus: result
                        })

                    } else {
                        reject({
                            status: 400, 
                            message: "list of menus is empty"
                        });
                    }
            });
        } catch (error) {
            console.log("selectValuesMenusListFromDB error");
            console.log(error);
            reject({status: 500, message: "server problem, table sql error"});
        }
    });
}



export async function selectValuesProductsListFromMenuFromDB(req, values){
    return new Promise((resolve, reject) => {
        try {
            connection.query(
                `SELECT * FROM ${values.tableName} WHERE ${values.colonneName} = ?`, values.colonneValue,
                (err, result) => {
                    if (err) {
                        console.log("selectValuesProductsListFromMenuFromDB error");
                        console.log(err);
                        return reject({
                            status: 500, 
                            message: "server problem, sql error"
                        });
                    }

                    if (result.length > 0) {
                        console.log("selectValuesProductsListFromMenuFromDB -> result");
                        console.log(result);
                        resolve({
                            status: 200, 
                            message: "products found",
                            products: result
                        })

                    } else {
                        reject({
                            status: 400, 
                            message: "list of products is empty"
                        });
                    }
            });
        } catch (error) {
            console.log("selectValuesProductsListFromMenuFromDB error");
            console.log(error);
            reject({status: 500, message: "server problem, table sql error"});
        }
    });
}



// export async function selectValuesTimeTableFromDB(req, values){}