import "./App.css";
import Bar from "./Mycomponents/Bar";
import { useState } from "react";
import { TodoContext, WhichToRenderTodo } from "./Context/TodoContext";
import { v4 as uuidv4 } from "uuid";

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

  return (
    <ThemeProvider theme={Theme}>
      <TodoContext.Provider value={{ TodoList, setTodolist }}>
        <WhichToRenderTodo.Provider value={{ RenderTodo, setRenderTodo }}>
          <div className="App">
            <Bar />
          </div>
        </WhichToRenderTodo.Provider>
      </TodoContext.Provider>
    </ThemeProvider>
  );
}

export default App;
