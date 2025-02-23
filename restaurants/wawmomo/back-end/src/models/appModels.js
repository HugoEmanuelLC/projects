import {} from "dotenv/config";
import connection from "../dbConfigs/mysql.js";



const valuesModelAuth = {
    username: "",
    email: "",
    password: "",
    id: null,
    secretKey: process.env.SECRET_TOKEN_KEY,
    expiresIn: "24h",
    token: "",
}

const valuesModelUserInfos = {
    firstname: "",
    lastname: "",
    address:"",
    phone: "",
    email: "",
}

const valuesModelTable = {
    tableAuthName:"auth",
    colonneEmailName: "email",
    colonnePasswordName: "password",
    colonneIdName: "_id",
}

export const valuesModelBody = {
    body: {
        auth: {...valuesModelAuth},
        userInfos: {...valuesModelUserInfos},
    },
    connection: connection,
    valuesTable: {...valuesModelTable},
}