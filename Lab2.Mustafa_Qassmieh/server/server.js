import "dotenv/config";
import express from 'express';
import logger from 'morgan';
import {router} from './routes/mainRouter.js';
import connection from './connect/connection.js';


export const app = express();
console.log(process.env.URL);
console.log(process.env.PORT);
connection();
app.use(express.json());
app.use('/', router);
app.use(logger('dev', { immediate: true }));
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
