import urlForFetch from "../../authentication/scripts/fetch-urls";
import {fetchApi} from "../../authentication/scripts/authentication-scripts";




export const imagesList = () => {
    return new Promise((resolve, reject) => {
        fetchApi(urlForFetch.imagesList, 'GET', {}, null)
        .then((res) => {
            console.log("res : test imagesList");
            console.log(res.content.images);
            resolve(res.content.images);
        })
        .catch((err) => {
            console.error("Err : ", err);
            reject(err);
        });
    })
}