import connection from "../../dbConfigs/mysql.js";
/**
 * @param {object} values.body
 *  - values.body.email for email test or null
 *  - values.body.id for session test or null
 * @param {object} values.connection
 *  - values.connection.query
 * @param {object} values.valuesTable
 *  - values.valuesTable.tableAuthName
 *  - values.valuesTable.colonneEmailName
 */ 
export async function getValuesAuthFromDB(req, values){
    return new Promise((resolve, reject) => {
        try {
            connection.query(
                `SELECT * FROM ${values.tableName} WHERE ${values.colonneName} = ?`, values.colonneValue,
                (err, result) => {

                    if (err) {
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