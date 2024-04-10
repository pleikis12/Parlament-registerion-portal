import multer from 'multer';
import { access, mkdir } from 'node:fs/promises';

const storage = multer.diskStorage({
    destination: async (req, file, next) => {
        const uploadDir = "./uploads";

        try {
            await access(uploadDir);
            // console.log("directory exists");
            
        }
        catch (error) {
            // console.log("directory not existant");
            await mkdir(uploadDir);
        }

        next(null, uploadDir);
    },
    filename: (req, file, next) => {
        const fileSplit = file.originalname.split('.');
        const format = fileSplit[fileSplit.length - 1];
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        next(null, uniqueSuffix + "." + format);
    }
})

const upload = multer({
    limits: { 
        fileSize: 2097152 
    },
    fileFilter: (req, file, next) => {
        const formats = [
            'image/jpeg',
            'image/png',
        ]
        if (formats.includes(file.mimetype)) {
            // if (file.size<2097152) 
            next(null, true)
            // else next(new Error('File size too big'),false)
        }
        else {
            next('format', false);
        }
    },
    storage: storage,
});

export default upload;