

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8081;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../../dist')));

app.get('/api/keys', (req, res) => {
  const keys = {
    geonames: process.env.GEONAMES,
    weatherbit: process.env.WEATHERBIT_API_KEY,
    pixabay: process.env.PIXABAY_API_KEY,
  };
  res.json(keys);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

export default app;
