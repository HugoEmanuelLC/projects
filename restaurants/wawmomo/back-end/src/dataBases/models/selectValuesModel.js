import connection from "../dbConfigs/mysql.js";



/**
 * @param {object} values values.tableName, values.colonneName, values.colonneValue
 * @returns {Promise} status, message, data
 */
export async function modelSelectFromDB(values){
    return new Promise((resolve, reject) => {
        try {
            connection.query(
                `SELECT * FROM ${values.tableName} WHERE ${values.colonneName} = ?`, values.colonneValue,
                (err, result) => {
                    if (err) {
                        console.log("modelSelectFromDB error");
                        console.log(err);
                        return reject({
                            status: 500, 
                            message: "server problem, sql error"
                        });
                    }

                    if (result.length > 0) {
                        resolve({
                            status: 200, 
                            message: "data found",
                            data: result
                        })

                    } else {
                        reject({
                            status: 204, 
                            message: "data not found"
                        });
                    }
            });
        } catch (error) {
            console.log("modelSelectFromDB error");
            console.log(error);
            reject({status: 500, message: "server problem, table sql error"});
        }
    });
}



export async function modelSelectLeftJoinFromDB(values){
    return new Promise((resolve, reject) => {
        try {
            connection.query(
                `SELECT ${values.select} FROM ${values.tableName} 
                LEFT JOIN ${values.tableName2} 
                ON ${values.colonneName} = ${values.colonneName2}`,
                (err, result) => {
                    if (err) {
                        console.log("modelSelectFromDB error");
                        console.log(err);
                        return reject({
                            status: 500, 
                            message: "server problem, sql error"
                        });
                    }

                    if (result.length > 0) {
                        resolve({
                            status: 200, 
                            message: "data found",
                            data: result
                        })

                    } else {
                        reject({
                            status: 204, 
                            message: "data not found"
                        });
                    }
            });
        } catch (error) {
            console.log("modelSelectFromDB error");
            console.log(error);
            reject({status: 500, message: "server problem, table sql error"});
        }
    });
}


export async function modelSelectAllFromDB(values){
    return new Promise((resolve, reject) => {
        try {
            connection.query(
                `SELECT * FROM ${values.tableName}`,
                (err, result) => {
                    if (err) {
                        console.log("modelSelectFromDB error");
                        console.log(err);
                        return reject({
                            status: 500, 
                            message: "server problem, sql error"
                        });
                    }

                    if (result.length > 0) {
                        resolve({
                            status: 200, 
                            message: "data found",
                            data: result
                        })

                    } else {
                        reject({
                            status: 204, 
                            message: "data not found"
                        });
                    }
            });
        } catch (error) {
            console.log("modelSelectFromDB error");
            console.log(error);
            reject({status: 500, message: "server problem, table sql error"});
        }
    });
}