import express from 'express';
import cors from 'cors';
import { PORT } from "./configs/env.config.js";
import router from './routes/index.route.js';

const app = express();
const port = PORT || 3000;

app.use(cors({ origin: 'http://localhost:5173' })); 

app.use(express.json());

app.use('/', router)
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});