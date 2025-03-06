import connection from "../dbConfigs/mysql.js";



/**
 * @param {object} values values.tableName, values.colonneName, values.SETvalues
 * @returns {Promise} status, message
 */
export async function modelCreateFromDB(values){
    return new Promise((resolve, reject) => {
        try {
            connection.query(
                `INSERT INTO ${values.tableName}(${values.colonneName}) VALUES (${values.SETvalues})`,
                (err, result) => {
                    if (err) {
                        console.log("modelCreateFromDB error");
                        console.log(err);
                        return reject({
                            status: 500, 
                            message: "server problem, sql error"
                        });
                    }

                    if (result.affectedRows > 0) {
                        resolve({
                            status: 200, 
                            message: "data created"
                        })

                    } else {
                        reject({
                            status: 400, 
                            message: "impossible to create"
                        });
                    }
            });
        } catch (error) {
            console.log("modelCreateFromDB error");
            console.log(error);
            reject({status: 500, message: "server problem, table sql error"});
        }
    });
}