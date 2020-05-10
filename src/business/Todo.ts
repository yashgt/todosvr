import {Promise} from 'es6-promise';
import {ToDo} from '../models/ToDo';
import todo, {mongoose, IToDo, CreateToDo} from '../models/db';



export function GetTodos(criteria:any): Promise<ToDo[]> {
  //create query
  return new Promise<ToDo[]>(
    //This is the executor function. This is immediately executed
    //The executor functions takes 2 callbacks
    (resolve, reject) => {
      console.log('Finding');

      todo.find({done:false}).then( (todos: IToDo[]) =>
        resolve(todos.map(t => CreateToDo(t)))
      ).catch( (err:Error) => reject(err));

    }
  );
};

export function GetTodo(todoId:string): Promise<ToDo> {
  return new Promise<ToDo>(
    (resolve, reject) => {
      //call async
      todo.findById(mongoose.Types.ObjectId(todoId))
      .then( (t: IToDo) => resolve(CreateToDo(t)))
      .catch( (err: Error) =>reject(err));
    }
  );
}

export function DeleteTodo(todoId:number): Promise<any> {
  return new Promise<any>(
    (resolve, reject) => {
      todo.deleteOne(mongoose.Types.ObjectId(todoId))
      .then( (res) => resolve(res) )
      .catch( (err: Error) =>reject(err) );
    }
  );
}


export function CreateTodo(todo1:ToDo): Promise<ToDo> {
  return new Promise<ToDo>(
    (resolve, reject) => {
      console.log("Creating ", todo1);
      todo.create(todo1)
      .then( (t: IToDo) => resolve(CreateToDo(t)))
      .catch( (err: Error) =>reject(err) );
    }
  );
}

export function UpdateTodo(todo1:ToDo): Promise<ToDo> {
  return new Promise<ToDo>(
    (resolve, reject) => {
      todo.updateOne({_id: mongoose.Types.ObjectId(todo1.id)}, todo1 )
      .then( (t: IToDo) => resolve(CreateToDo(t)))
      .catch((err: Error) =>reject(err));
    }
  );
}

export function PatchTodo(todoId:string, todo1:ToDo): Promise<ToDo> {
  return new Promise<ToDo>(
    (resolve, reject) => {
      todo.findById(todoId)
      .then( (todoObj:IToDo) =>{
        //This is a PATCH call and hence need to check each field
        todoObj.name = todo1.name? todo1.name: todoObj.name;
        todoObj.completeBy = todo1.completeBy ? todo1.completeBy : todoObj.completeBy;
        todoObj.done = todo1.done == undefined ? todoObj.done : todo1.done;

        console.log("Patching as ", todoObj);
        todo.findByIdAndUpdate(mongoose.Types.ObjectId(todoId), todoObj).then( (t: IToDo) => resolve(CreateToDo(t)))
} )
/*
        todo.updateOne({ _id: mongoose.Types.ObjectId(todoObj._id)}, todoObj ).then( (t: IToDo) => resolve(CreateToDo(t)))
      } ) */
      .catch((err: Error) =>reject(err));




    }
  );
}


