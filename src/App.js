import "./App.css";
import Bar from "./Mycomponents/Bar";
import { useState } from "react";
import {
  TodoContext,
  WhichToRenderTodo,
  ShowNotificationBar,
} from "./Context/TodoContext";
import { v4 as uuidv4 } from "uuid";
import MyNotificationBar from "./Mycomponents/MyNotificationBar";
//theme
import { ThemeProvider, createTheme } from "@mui/material/styles";

const Theme = createTheme({
  palette: {
    primary: { main: "#4caf50" },
  },
});

function App() {
  const inisialList = [
    {
      id: uuidv4(),
      title: "",
      content: "",
      isComplete: false,
      date: "",
    },
  ];
  const [TodoList, setTodolist] = useState(inisialList);
  const [RenderTodo, setRenderTodo] = useState("All");
  const [Show, setShow] = useState(false);
  const [ShowMassage, setShowMassage] = useState("");
  function ShowHideMassageNotificationBar(Massage) {
    setShow(true);
    setShowMassage(Massage);
    setTimeout(() => {
      setShowMassage("");
      setShow(false);
    }, 2000);
  }
  return (
    <ThemeProvider theme={Theme}>
      <TodoContext.Provider value={{ TodoList, setTodolist }}>
        <WhichToRenderTodo.Provider value={{ RenderTodo, setRenderTodo }}>
          <ShowNotificationBar.Provider value={ShowHideMassageNotificationBar}>
            <div className="App">
              <MyNotificationBar State={Show} Massage={ShowMassage} />
              <Bar />
            </div>
          </ShowNotificationBar.Provider>
        </WhichToRenderTodo.Provider>
      </TodoContext.Provider>
    </ThemeProvider>
  );
}

export default App;
