import multer from 'multer';
import path from 'path';

const upload = multer({
    storage: multer.diskStorage({
        destination: './public/images',
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            const fileName = file.originalname.replace(ext, '');
            cb(null, `${fileName}${ext}`);
        },
    }),
});

export const config = {
    api: {
        bodyParser: false,
    },
};

export default function handler(req, res) {
    upload.single('image')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(500).json({ error: err.message });
        } else if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded.' });
        }

        res.status(200).json({ message: 'File uploaded successfully!' });
    });
}
