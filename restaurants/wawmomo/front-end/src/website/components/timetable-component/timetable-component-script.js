import urlForFetch from "../../../authentication/scripts/fetch-urls";
import {fetchApi} from "../../../authentication/scripts/authentication-scripts";


export const timetableList = () => {
    return new Promise((resolve, reject) => {
        fetchApi(urlForFetch.timetableList, 'GET', {}, null)
        .then((res) => {
            console.log("Res : ", res.content.timetable);
            resolve(res.content.timetable);
        })
        .catch((err) => {
            console.error("Err : ", err);
            reject(err);
        });
    })
}