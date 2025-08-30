import { createContext, useState, useContext, useReducer } from "react";
import MyNotificationBar from "../Mycomponents/MyNotificationBar";
import { v4 as uuidv4 } from "uuid";
import TodoReducer from "../Reducers/TodoReduce";
export const DateContext = createContext();

//< Toast Provider
const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [Show, setShow] = useState(false);
  const [ShowMassage, setShowMassage] = useState("");
  function HideShowToast(Massage) {
    setShow(true);
    setShowMassage(Massage);
    setTimeout(() => {
      setShowMassage("");
      setShow(false);
    }, 1000);
  }
  return (
    <ToastContext.Provider value={{ HideShowToast }}>
      <MyNotificationBar State={Show} Massage={ShowMassage} />

      {children}
    </ToastContext.Provider>
  );
};
export const useToast = () => {
  return useContext(ToastContext);
};
//Toast.Provider/>
//<TodoProvider
const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const inisialList = [
    {
      id: uuidv4(),
      title: "",
      content: "",
      isComplete: false,
      date: "",
    },
  ];
  const [TodoList, dispatch] = useReducer(TodoReducer, inisialList);
  return (
    <TodoContext.Provider value={{ TodoList, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};
export const useTodo = () => {
  return useContext(TodoContext);
};
//TodoProvider/>
