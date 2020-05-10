import mongoose, { Schema, Document } from 'mongoose';
import { GetTodo } from '../business/Todo';
import { ToDo } from './ToDo';

interface IToDo extends Document {
  name: string;
  completeBy: Date;
  done: boolean;
}

const ToDoSchema: Schema = new Schema({name:String, completeBy:Date, done:Boolean});

function CreateToDo(t:IToDo ) : ToDo {
  let t1 = new ToDo();
  t1.id = t.id;
  t1.name = t.name;
  t1.completeBy = t.completeBy;
  t1.done = t.done;
  return t1;
}

export {CreateToDo}
export {mongoose,IToDo};
export default mongoose.model<IToDo>('ToDo', ToDoSchema,'todo');




