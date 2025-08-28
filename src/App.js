import "./App.css";
import Bar from "./Mycomponents/Bar";
import { TodoProvider, ToastProvider } from "./Context/TodoContext";
//theme
import { ThemeProvider, createTheme } from "@mui/material/styles";
const Theme = createTheme({
  palette: {
    primary: { main: "#4caf50" },
  },
});
function App() {
  return (
    <TodoProvider>
      <ThemeProvider theme={Theme}>
        <ToastProvider>
          <div className="App">
            <Bar />
          </div>
        </ToastProvider>
      </ThemeProvider>
    </TodoProvider>
  );
}

export default App;
