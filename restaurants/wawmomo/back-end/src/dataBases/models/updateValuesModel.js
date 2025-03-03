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




export async function updateValuesProduitFromDB(req, values){
    return new Promise((resolve, reject) => {
        try {

            console.log("updateValuesProduitFromDB");
            console.log(req.body);

            // resolve({
            //     status: 200, 
            //     message: "product updated",
            //     produit: {}
            // })

            connection.query(
                `UPDATE ${values.tableName} 
                SET 
                    ${values.colonneName.product_name} = "${req.body.product.product_name}" ,
                    ${values.colonneName.product_price} = ${req.body.product.product_price} ,
                    ${values.colonneName.product_description} = "${req.body.product.product_description}"
                WHERE ${values.colonneName.product_id} = ${req.params.params}`,
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