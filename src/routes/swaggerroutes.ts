import express, { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../swagger.json'

//https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes
const router = express.Router();



router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

export {router as swaggerrouter};
