import connection from "../dbConfigs/mysql.js";



export async function updateValuesAuthPasswordFromDB(req, values){
    return new Promise((resolve, reject) => {
        try {
            // let id = Math.floor(Math.random() * 1000);

            connection.query(
                `UPDATE ${values.tableName} 
                SET ${values.colonneName.password} = "${req.body.auth.password}" 
                WHERE ${values.colonneName.id} = ${req.body.configDB.infosFromDB._id}`,
                (err, result) => {
                    if (err) {
                        console.log("updateValuesAuthPasswordFromDB error");
                        console.log(err);
                        return reject({
                            status: 500, 
                            message: "server problem, sql error"
                        });
                    }

                    if (result.affectedRows > 0) {
                        resolve({
                            status: 200, 
                            message: "password updated"
                        })

                    } else {
                        reject({
                            status: 400, 
                            message: "impossible to update password"
                        });
                    }
            });
        } catch (error) {
            console.log("updateValuesAuthPasswordFromDB error");
            console.log(error);
            reject({status: 500, message: "server problem, table sql error"});
        }
    });
}




export async function updateValuesMenuFromDB(req, values){
    let colonneName = ""
    values.colonneName.forEach((element, index) => {
        element !== values.colonneName[0] ? 
        colonneName += `${element} = "${req.body.menu[element]}"${index < values.colonneName.length - 1 ? "," : ""}` 
        : null
    })

    console.log("updateValuesMenuFromDB");
    console.log(colonneName);
    console.log(req.body.menu['menu_name']);

    return new Promise((resolve, reject) => {
        try {
            connection.query(
                `UPDATE ${values.tableName} 
                SET ${colonneName} 
                WHERE ${values.colonneName[0]} = ${values.colonneValue}`,
                (err, result) => {
                    if (err) {
                        console.log("updateValuesMenuFromDB error");
                        console.log(err);
                        return reject({
                            status: 500, 
                            message: "server problem, sql error"
                        });
                    }

                    if (result.affectedRows > 0) {
                        resolve({
                            status: 200, 
                            message: "menu updated"
                        })

                    } else {
                        reject({
                            status: 400, 
                            message: "impossible to update menu"
                        });
                    }
            });
        } catch (error) {
            console.log("updateValuesMenuFromDB error");
            console.log(error);
            reject({status: 500, message: "server problem, table sql error"});
        }
    });
}




export async function updateValuesProduitFromDB(req, values){
    let colonneName = ""
    values.colonneName.forEach((element, index) => {
        element !== values.colonneName[0] ? 
        colonneName += `${element} = "${req.body.product[element]}"${index < values.colonneName.length - 1 ? "," : ""}` 
        : null
    })

    return new Promise((resolve, reject) => {
        try {
            connection.query(
                `UPDATE ${values.tableName} 
                SET ${colonneName}
                WHERE ${values.colonneName[0]} = ${values.colonneValue}`,
                (err, result) => {
                    if (err) {
                        console.log("updateValuesProduitFromDB error");
                        console.log(err);
                        return reject({
                            status: 500, 
                            message: "server problem, sql error"
                        });
                    }

                    if (result.affectedRows > 0) {
                        resolve({
                            status: 200, 
                            message: "product updated"
                        })

                    } else {
                        reject({
                            status: 400, 
                            message: "impossible to update product"
                        });
                    }
            });
        } catch (error) {
            console.log("updateValuesProduitFromDB error");
            console.log(error);
            reject({status: 500, message: "server problem, table sql error"});
        }
    });
}