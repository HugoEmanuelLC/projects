import multer from "multer";

const MIME_TYPES = {
    'jpg': 'jpg',
    'jpeg': 'jpg',
    'png': 'png'
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './src/uploads')
    },
    filename: function (req, file, cb) {
        // const name = file.originalname.split(' ').join('_');
        // const extension = MIME_TYPES[file.mimetype];
        // return cb(null, name + Date.now() + '.' + extension)
        return cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({ storage })

// export let valueTest = {
//     storage
// }


// const upload = multer({ dest: './src/uploads/' })

export default upload;
// Compare this snippet from src/routes/routeAuth.js: