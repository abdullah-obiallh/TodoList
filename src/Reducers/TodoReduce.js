import { v4 as uuidv4 } from "uuid";

export default function TodoReducer(CurrentState, Action) {
  switch (Action.type) {
    case "add": {
      let newList = [...CurrentState];
      newList = {
        id: uuidv4(),
        title: Action.payload.inputTitle,
        content: Action.payload.inputContent,
        isComplete: false,
        date: Action.payload.inputDate,
      };

      const newtodoadd = [...CurrentState, newList];

      localStorage.setItem("todos", JSON.stringify(newtodoadd));

      return newtodoadd;
    }
    case "delete": {
      const newtodolist = CurrentState.filter(
        (item) => item.id !== Action.payload.dialogtodo.id
      );

      localStorage.setItem("todos", JSON.stringify(newtodolist));
      return newtodolist;
    }
    case "edit": {
      const changedtodolist = CurrentState.map((item) => {
        if (item.id === Action.payload.Editinput.id) {
          return {
            ...item,
            title: Action.payload.Editinput.title,
            content: Action.payload.Editinput.content,
            date: Action.payload.inputDate,
          };
        }
        return item;
      });
      localStorage.setItem("todos", JSON.stringify(changedtodolist));

      return changedtodolist;
    }
    case "check": {
      const NewToDo = CurrentState.map((item) => {
        if (item.id === Action.payload.id) {
          return { ...item, isComplete: !item.isComplete };
        }
        return item;
      });
      localStorage.setItem("todos", JSON.stringify(NewToDo));
      return NewToDo;
    }
    case "get": {
      const savefromnull = JSON.parse(localStorage.getItem("todos")) ?? [];
      return savefromnull;
    }
    default: {
    }
  }
}
