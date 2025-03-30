const urlLocal = 'http://localhost:3001';
const urlExterne = 'https://wawmomo-api-test.root.caprover.clavinas.com';
const urlServer = urlLocal;

const urlApiAuth = urlServer+'/auth';
const urlApi = urlServer;

// const urlApiAuth = 'http://localhost:3001/auth';
// const urlApi = 'http://localhost:3001';

const urlForFetch = {
    login: urlApiAuth+'/login',
    verifSession: urlApiAuth+'/verif-session',
    forgotPassword: urlApiAuth+'/forgot-password',
    updatePassword: urlApiAuth+'/update-password',
    
    menusSelect: urlApiAuth+'/menus/select',
    menuCreate: urlApiAuth+'/menu/create',
    menuUpdate: urlApiAuth+'/menu/update',
    menuDelete: urlApiAuth+'/menu/delete',
    
    productsSelect: urlApiAuth+'/products/select',
    productCreate: urlApiAuth+'/product/create',
    produitUpdate: urlApiAuth+'/product/update',
    productDelete: urlApiAuth+'/product/delete',
    
    selectTimetable: urlApiAuth+'/time-table/select',
    createTimetableDay: urlApiAuth+'/time-table-day/create',
    updateTimetableDay: urlApiAuth+'/time-table-day/update',
    deleteTimetableDay: urlApiAuth+'/time-table-day/delete',
    createTimetableComment: urlApiAuth+'/time-table-comment/create',
    updateTimetableComment: urlApiAuth+'/time-table-comment/update',
    deleteTimetableComment: urlApiAuth+'/time-table-comment/delete',

    createSelect: urlApiAuth+'/images/select',
    createImage: urlApiAuth+'/image/create',

    menusList: urlApi+'/menus-list',
    productsListFromMenu: urlApi+'/products-from-menu',
    timetableList: urlApi+'/timetable-list',
    
}

export default urlForFetch;



export const cookieName = 'auth';