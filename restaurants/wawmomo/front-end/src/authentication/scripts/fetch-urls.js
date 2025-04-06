const urlLocal = 'http://localhost:3001';
const urlExterne = 'https://wawmomo-api-test.root.caprover.clavinas.com';

const urlLocalStorageImages = 'http://localhost:3002';
const urlExterneStorageImages = 'https://uploads-images-api.root.caprover.clavinas.com';

// control de l'url de l'api
export const urlServer = urlExterne;
export const urlServerImages = urlExterneStorageImages;

const urlApiAuth = urlServer+'/auth';
const urlApi = urlServer;

const urlApiAuthImages = urlServerImages+'/auth';
const urlApiImages = urlServerImages;

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

    selectImage: urlApiAuthImages+'/images/select',
    createImage: urlApiAuthImages+'/image/create',
    imageUpdate: urlApiAuthImages+'/image/update',
    imageDelete: urlApiAuthImages+'/image/delete',

    jointureImagesSections: urlApiAuth+'/jointure-images-sections/select',
    createSectionImage: urlApiAuth+'/sections-images/create',

    menusList: urlApi+'/menus-list',
    productsListFromMenu: urlApi+'/products-from-menu',
    timetableList: urlApi+'/timetable-list',
    imagesList: urlApiImages+'/images-list',
    
}

export default urlForFetch;



export const cookieName = 'auth';