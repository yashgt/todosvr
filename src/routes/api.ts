import express, { Router } from 'express';
import * as cors from 'cors';
import * as TodoController from '../controllers/TodoController';

//https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes
const router = express.Router();

const options:cors.CorsOptions = {
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: "http://localhost:4200",  //Allow this client to make the above calls
  preflightContinue: false};

router.use(cors.default(options));

router.route('/todos')
.get( TodoController.GetTodos)
.post( TodoController.CreateTodo);

//A router lets you use the same URL for multiple operations identified by the Verb.
router.route('/todos/:id')
.get( TodoController.GetTodo )
.put( TodoController.UpdateTodo)
.patch( TodoController.PatchTodo)
.delete(TodoController.DeleteTodo);


//enable pre-flight
router.options("*", cors.default(options));

export {router as restrouter};
