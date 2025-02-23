// Dependences
import bcrypt from "bcrypt";


export async function verifyListUsersFromDb(body, conn) {
    return await new Promise((resolve, reject) => {
        try {
            conn.connection.query(
                `SELECT * FROM ${conn.valueTable.tableAuthName}`, 
                (err, result) => {
                    
                // err && reject({status: 500, message: "server problem", info: err });
                if (err) {
                    console.log("verifyListUsersFromDb -> error");
                    // console.log(err);
                    return reject({status: 500, message: "server problem", info: err?.sqlMessage });
                }
    
                result?.length > 0 ?
                verifyUserInformations(body, conn)
                    .then(data => resolve(data)).catch(error => reject(error)) 
                    :
                    resolve({id: Math.floor(Math.random() * 1000)});
            });
        } catch (error) {
            console.log("verifyListUsersFromDb -> error");
            console.log(error);
            reject({status: 500, message: "server problem", info: error?.sqlMessage });
        }
    });
}



export async function verifyUserInformations(body, conn) {
    return await new Promise((resolve, reject) => {
        const userInfos = body;
        conn.connection.query(
            `SELECT * FROM ${conn.valueTable.tableAuthName} WHERE ${conn.valueTable.colonneEmailName} = ?`, 
            userInfos.email, (err, result) => {
                
                // err && reject({status: 500 , message: "server problem", info: err });
                if (err) {
                    console.log("verifyUserInformations -> error");
                    console.log(err);
                    return reject({status: 500, message: "server problem", info: err?.sqlMessage });
                }
                
                result.length > 0 ? 
                    reject({status: 400, message: "email already exists", info: err?.sqlMessage })
                : 
                    resolve({status: 200, message: "email not found", info: null });
        });
    });
}



export async function getUserInformations(body, conn) {
    return new Promise((resolve, reject) => {
        conn.connection.query(
            `SELECT * FROM ${conn.valueTable.tableAuthName} WHERE ${conn.valueTable.colonneEmailName} = ?`, 
            body.email, (err, result) => {
                
                err && reject({status: 500, message: "server problem", info: err });
                
                result.length > 0 ? 
                    resolve({status: 200, message: "user found", info: result})
                : 
                    reject({status: 400, message: "user not found", info: null});
        });
    });
    
}



export async function addNewUserInDb(body, conn) {
    let userInfos = {email: body.email, password: body.password};
    // hachage du mot de passe
    const saltRounds = await bcrypt.genSalt();
    let psw = await bcrypt.hash(userInfos.password, saltRounds);
    userInfos.password = psw;

    return new Promise((resolve, reject) => {
        verifyUserInformations(body, conn)
        .then(() => {
            conn.connection.query(`INSERT INTO ${conn.valueTable.tableAuthName} SET ?`, userInfos, (err, result) => {
                err ? 
                    reject({status: 500, message: "server problem", info: err }) 
                : 
                    resolve({status: 201, message: "user created", info: {insertId: result.insertId} });
            });
        })
        .catch(error => {
            reject(error);
        });
    })
};



export async function updateUserPassword(value, conn) {
    let userInfos = value;
    // hachage du mot de passe
    const saltRounds = await bcrypt.genSalt();
    let psw = await bcrypt.hash(userInfos.newPassword, saltRounds);
    userInfos.password = psw;

    return new Promise((resolve, reject) => {
        conn.connection.query(
            `UPDATE ${conn.valueTable.tableAuthName} SET ${conn.valueTable.colonnePasswordName} = ? WHERE ${conn.valueTable.colonneIdName} = ?`, 
            [userInfos[conn.valueTable.colonnePasswordName], userInfos[conn.valueTable.colonneIdName]], (err, result) => {
                
                err && reject({status: 500, message: "server problem", info: err });
                
                result.affectedRows > 0 ? 
                    resolve({status: 200, message: "user updated", info: result})
                : 
                    reject({status: 400, message: "user not found", info: null});
        });
    });
}



async function verifiedUserExisted(body, conn) {
    let tableValues = [...conn.tableValues.colonneNames];
    let newStringValue = ""
    tb.forEach((el) => {
        tableValues.length - 1 === tb.indexOf(el) ? newStringValue += el : newStringValue += el + ", "
    })

    return new Promise((resolve, reject) => {
        conn.connection.query(
            `SELECT ${newStringValue} FROM ${conn.valueTable.tableAuthName} WHERE ${conn.valueTable.colonneEmailName} = ?`, 
            body.email, (err, result) => {
                
                err && reject({status: 500, message: "server problem", info: err });
                
                result.length > 0 ? 
                    resolve({status: 200, message: "user found", info: result})
                : 
                    reject({status: 400, message: "user not found", info: null});
        });
    });
    
}










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
export async function getAuthInformationsFoundInDB(values){
    let colonneName = values.valuesTable.colonneEmailName === null ? 
        values.valuesTable.colonneIdName : 
        values.valuesTable.colonneEmailName

    let colonneValue = values.valuesTable.colonneEmailName === null ? 
        values?.body.auth.id : 
        values?.body.auth.email

    return new Promise((resolve, reject) => {
        try {
            // console.log(values);
            values.connection.query(
                `SELECT * FROM ${values.valuesTable.tableAuthName} 
                WHERE ${colonneName} = ?`, 
                colonneValue,
                (err, result) => {
                    
                    err && reject({status: 500, message: "server problem", infos: err });
                    
                    result.length > 0 ? 
                        resolve({status: 200, message: "user found", infos: result})
                    : 
                        reject({status: 400, message: "user not found", infos: null});
            });
        } catch (error) {
            reject({status: 500, message: "server problem", infos: error.message, fnc:"catch try" });
        }
    });
} 


