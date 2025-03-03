const model_infos = {
    auth:{
        verifSession:{
            tableName: "auth",
            colonneName: "_id"
        },
        updatePassword: {
            tableName: "auth",
            colonneName: "password"
        },
        updateInfos: {
            tableName: "auth",
            colonneNameUsername: "username",
            colonneNameEmail: "email"   
        }
    },

    menus:{
        select:{
            tableName: "menus",
            colonneName: "fk_auth"
        },
        update: {
            tableName: "menus",
            colonneName: "_id"
        }
    },

    products:{
        select:{
            tableName: "products",
            colonneName: [
                "_id",
                "product_name",
                "product_price",
                "product_description"
            ]
        },
        update: {
            tableName: "products",
            colonneName: "_id"
        }
    }
}

export default model_infos