export class ToDo {
  id: string;
  name: string;
  completeBy: Date;
  done: boolean;

  /*
  constructor(todoObj?: db.IToDo) {
    this.name = todoObj && todoObj.name || "";
    this.id = todoObj && todoObj._id || "";
  };
  */
}
