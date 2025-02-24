import connection from "../../dbConfigs/mysql.js";



/**
 * @param {object} req req.body.auth.infosFromDB = result[0]
 * @param {object} values values.tableName, values.colonneName, values.colonneValue
 * @returns {Promise} status, message, auth { username, password } + req.body.auth.infosFromDB = result[0]
 */
export async function getValuesAuthFromDB(req, values){
    return new Promise((resolve, reject) => {
        try {
            connection.query(
                `SELECT * FROM ${values.tableName} WHERE ${values.colonneName} = ?`, values.colonneValue,
                (err, result) => {
                    if (err) {
                        console.log("getAuthDBValues error");
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
            console.log("getAuthDBValues error");
            console.log(error);
            reject({status: 500, message: "server problem, table sql error"});
        }
    });
} 



export async function getValuesUserInfosFromDB(req, values){

}



export async function getValuesMenusFromDB(req, values){
    
}



export async function getValuesProductsFromMenuFromDB(req, values){
    
}



export async function getValuesTimeTableFromDB(req, values){
    
}