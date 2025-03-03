import connection from "../dbConfigs/mysql.js";



export async function updateValuesAuthFromDB(req, values){
    return new Promise((resolve, reject) => {
        try {
            let id = Math.floor(Math.random() * 1000);

            connection.query(
                `UPDATE ${values.tableName} 
                SET ${values.colonneName.id} = ${id}, ${values.colonneName.password} = "${req.body.auth.password}" 
                WHERE ${values.colonneName.id} = ${req.body.auth.infosFromDB._id}`,
                (err, result) => {
                    if (err) {
                        console.log("updateValuesAuthFromDB error");
                        console.log(err);
                        return reject({
                            status: 500, 
                            message: "server problem, sql error"
                        });
                    }

                    if (result.affectedRows > 0) {
                        resolve({
                            status: 200, 
                            message: "password updated",
                            auth: {}
                        })

                    } else {
                        reject({
                            status: 400, 
                            message: "impossible to update password"
                        });
                    }
            });
        } catch (error) {
            console.log("updateValuesAuthFromDB error");
            console.log(error);
            reject({status: 500, message: "server problem, table sql error"});
        }
    });
}