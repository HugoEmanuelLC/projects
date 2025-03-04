import connection from "../dbConfigs/mysql.js";


export async function createValuesMenuInDB(req, values){
    let colonneName = ""
    values.colonneName.forEach((element, index) => {
        colonneName += `${element}${index < values.colonneName.length - 1 ? ", " : ""}` 
    })
// INSERT INTO `menus`(`menu_name`, `fk_auth`) VALUES ('test','263');
    let colonneValue = ""
    values.colonneValue.forEach((element, index) => {
        colonneValue += `${element}${index < values.colonneValue.length - 1 ? ", " : ""}`
        // colonneValue += `${element}` 
    })

    console.log("createValuesMenuInDB");
    console.log(colonneValue);


    return new Promise((resolve, reject) => {
        try {
            connection.query(
                `INSERT INTO ${values.tableName}(${colonneName}) VALUES (${req.body.configDB.infosFromDB._id},"${colonneValue}")`,
                (err, result) => {
                    if (err) {
                        console.log("createValuesMenuInDB error");
                        console.log(err);
                        return reject({
                            status: 500, 
                            message: "server problem, sql error"
                        });
                    }

                    if (result.affectedRows > 0) {
                        resolve({
                            status: 200, 
                            message: "menu created"
                        })

                    } else {
                        reject({
                            status: 400, 
                            message: "impossible to create menu"
                        });
                    }
            });
        } catch (error) {
            console.log("createValuesMenuInDB error");
            console.log(error);
            reject({status: 500, message: "server problem, table sql error"});
        }
    });
}



export async function createValuesProductInDB(req, values){
    let colonneName = ""
    values.colonneName.forEach((element, index) => {
        colonneName += `${element}${index < values.colonneName.length - 1 ? ", " : ""}` 
    })

    let colonneValue = ""
    values.colonneValue.forEach((element, index) => {
        colonneValue += `"${element}"${index < values.colonneValue.length - 1 ? ", " : ""}`
    })
    

    return new Promise((resolve, reject) => {
        try {
            connection.query(
                `INSERT INTO ${values.tableName}(${colonneName}) VALUES (${req.body.configDB.infosFromDB._id},${req.params.params},${colonneValue})`,
                (err, result) => {
                    if (err) {
                        console.log("createValuesProductInDB error");
                        console.log(err);
                        return reject({
                            status: 500, 
                            message: "server problem, sql error"
                        });
                    }

                    if (result.affectedRows > 0) {
                        resolve({
                            status: 200, 
                            message: "product created"
                        })

                    } else {
                        reject({
                            status: 400, 
                            message: "impossible to create product"
                        });
                    }
            });
        } catch (error) {
            console.log("createValuesProductInDB error");
            console.log(error);
            reject({status: 500, message: "server problem, table sql error"});
        }
    });
}