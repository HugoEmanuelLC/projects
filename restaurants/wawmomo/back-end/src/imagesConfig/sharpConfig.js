// import sharp from 'sharp';
// import path from 'path';

// const sharpConfig = async (req, res, next) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ status: 400, message: "file not found" })
//         }

//         const filePath = req.file.path;
//         const newFileName = Date.now() + '_' + 'resize_' + req.file.originalname;
        
//         // Dossier pour les images redimensionnées
//         const resizeFilePath = path.join('./public/images/uploads/resized', newFileName);

//         sharp.cache(false); // Désactiver le cache de Sharp
//         // Redimensionnement avec Sharp
//         const sharpInstance = await sharp(filePath)
//         .resize(1000)// Format de sortie
//         .toFile(resizeFilePath, (err => {
//             if (err) {
//                 // Gérer l'erreur de redimensionnement
//                 console.error(err);
//                 return res.status(500).json({ status: 500, message: "Error resizing file" });
//             }
//             console.log("---------------------- File resized successfully ----------------------");
//             // Supprimer le fichier d'origine après redimensionnement
//         }))

//         // date de creation de l'image
//         const timestamp = Date.now();
//         const date = new Date(timestamp);

//         const year = date.getFullYear();
//         const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() renvoie un index de 0 à 11
//         const day = String(date.getDate()).padStart(2, '0');

//         const formattedDate = `${year}-${month}-${day}`;

//         // Enregistrement de l'image dans la base de données
//         req.body.image = {
//             image_name: newFileName,
//             image_date: formattedDate,
//         } 

//         req.body.res.status = 200
//         req.body.res.message = "Image resized and saved"
//         req.body.res.content = { file: { filename: newFileName } }
        
//         setTimeout(() => {
//             next()
//         }, 2000); // Attendre 2 seconde avant de supprimer le fichier d'origine

        
//     } catch (error) {
//         console.log("sharpConfig -> error");
//         console.log(error);
//         res.status(500).json({ status: 500, message: "server problem, impossible to resize" })
//     }
// }

// export default sharpConfig