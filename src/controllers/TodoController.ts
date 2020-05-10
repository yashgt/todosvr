import {Request, Response} from 'express-serve-static-core'; //This comes from @types/express....
import * as TodoBusiness from '../business/Todo'
import {ToDo} from '../models/ToDo';

//The controller deals with HTTP-level aspects such as params, query, sessions, cookies etc.
//The controller invokes the real business functions defined in the Model implemented as the Business Layer.

export function GetTodos(req: Request, res: Response) : void{
TodoBusiness.GetTodos({})
.then(
  (todos) =>{
    res.send(todos);
  }
)
};

export function GetTodo(req: Request, res: Response) : void{
  let todoId: string = String(req.params['id']);
  TodoBusiness.GetTodo(todoId)
  .then(
    (todo) =>{
      console.log("Fetched ", todo);
      res.send(todo);
    }
  )
};



export function DeleteTodo(req: Request, res: Response) : void{
  let todoId: number = Number(req.params['id']);
  TodoBusiness.DeleteTodo(todoId)
  .then(
    (todo) =>{
      res.send(todo);
    }
  )
};


export function CreateTodo(req: Request, res: Response) : void{
  let todo1:ToDo = req.body as ToDo;
  console.log("Creating ", todo1);
  TodoBusiness.CreateTodo(todo1)
  .then((todo) =>{
    console.log("Created ", todo);
    res.send(todo);
  });
};

export function PatchTodo(req: Request, res: Response) : void{
  let todoId: string = String(req.params['id']);
  let todo1:ToDo = req.body as ToDo;
  TodoBusiness.PatchTodo(todoId, todo1 )
  .then(
    (todo) =>{
      console.log("Patched ", todo);
      res.send(todo);
    }
  )


};

export function UpdateTodo(req: Request, res: Response) : void{
  TodoBusiness.UpdateTodo(req.body as ToDo)
  .then((todo) =>{
    console.log("Updated ", todo);
    res.send(todo);
  });
};


