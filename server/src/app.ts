const { v4: uuidv4 } = require('uuid');
import multer from 'multer';
import path from 'path';

import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import AppRoutes from './routes/AppRoutes';
import dbConnection from './db';

dotenv.config();

if (!process.env.API_ENDPOINT) {
  process.exit(1);
}
const app = express();

app.use((req, res, next) => {
  req.app.set('dbConnection', dbConnection);
  next();
});

app.use(
  cors({
    credentials: true,
  }),
);
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    const uniqueName = uuidv4() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });
app.post('/api/v1/image/upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a file' });
    }

    const data = `${req.protocol}://${req.get('host')}/images/${
      req.file.filename
    }`;
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});
app.use(express.json({ limit: '10mb' }));
app.use(AppRoutes);
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(process.env.API_ENDPOINT, () => {
  console.log(`Server port ${process.env.API_ENDPOINT} up and running...`);
});
