import fs from 'fs';



export const fsDeleteImage = (req, res, next) => {
    try {
        const filePath = req.file.path;
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ status: 500, message: "Error deleting file" });
            }
            console.log("File deleted successfully");
            req.body.res.status = 200
            req.body.res.message = "File deleted"
            next()
        });
    } catch (error) {
        console.log("deleteImage -> error");
        console.log(error);
        res.status(500).json({ status: 500, message: "server problem, impossible to delete" })
    }
}