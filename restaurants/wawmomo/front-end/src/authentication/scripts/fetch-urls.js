
const urlApi = 'http://localhost:3001/auth';

const urlForFetch = {
    login: urlApi+'/login',
    verifSession: urlApi+'/verif-session',
    forgotPassword: urlApi+'/forgot-password',
    updatePassword: urlApi+'/update-password',
    
    menusSelect: urlApi+'/menus/select',
    menuCreate: urlApi+'/menu/create',
    menuUpdate: urlApi+'/menu/update',
    menuDelete: urlApi+'/menu/delete',
    
    productsSelect: urlApi+'/products/select',
    productCreate: urlApi+'/product/create',
    produitUpdate: urlApi+'/product/update',
    productDelete: urlApi+'/product/delete',
    
    selectTimetable: urlApi+'/time-table/select',
    createTimetableDay: urlApi+'/time-table-day/create',
    updateTimetableDay: urlApi+'/time-table-day/update',
    deleteTimetableDay: urlApi+'/time-table-day/delete',
    createTimetableComment: urlApi+'/time-table-comment/create',
    updateTimetableComment: urlApi+'/time-table-comment/update',
    deleteTimetableComment: urlApi+'/time-table-comment/delete',
}

export default urlForFetch;



export const cookieName = 'auth';