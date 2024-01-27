import './data-source';
import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use(routes);

app.listen(8081, () => console.log('Iniciado'));
