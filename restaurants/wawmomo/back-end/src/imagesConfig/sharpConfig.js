import sharp from 'sharp';
import path from 'path';

const sharpConfig = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ status: 400, message: "file not found" })
        }

        const filePath = req.file.path;
        const newFileName = Date.now() + '_' + 'resize_' + req.file.originalname;
        
        // Dossier pour les images redimensionnées
        const resizeFilePath = path.join('./public/images/uploads/resized', newFileName);

        // Redimensionnement avec Sharp
        const sharpInstance = sharp(filePath);
        await sharpInstance
        .resize(1000)
        .toFile(resizeFilePath)

        console.log("---------------sharpConfig -> filePath");
        console.log(filePath);
        console.log("---------------sharpConfig -> filePath");

        req.body.res.status = 200
        req.body.res.message = "Image resized"
        // req.body.res.content = { file: { filename: newFileName } }
        next()

        
    } catch (error) {
        console.log("sharpConfig -> error");
        console.log(error);
        res.status(500).json({ status: 500, message: "server problem, impossible to resize" })
    }
}

export default sharpConfig