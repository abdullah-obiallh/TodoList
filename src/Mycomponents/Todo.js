import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
//another import
import { WhichToRenderTodo } from "../Context/TodoContext";
import { useState, useContext, useEffect } from "react";
import { TodoContext } from "../Context/TodoContext";
import Card from "./Card";
import { v4 as uuidv4 } from "uuid";
import ScrollTodo from "./ScrollTodo";
//date
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
//scroll import

export default function Todo() {
  const { RenderTodo } = useContext(WhichToRenderTodo);
  const { TodoList, setTodolist } = useContext(TodoContext);
  const [inputDate, setInputDate] = useState(dayjs());
  const [inputfield, setInputfield] = useState({ title: "", content: "" });

  let today = dayjs().format("YYYY-MM-DD");
  const CompletedToDo = TodoList.filter((t) => {
    return t.isComplete;
  });
  const NotCompletedToDo = TodoList.filter((t) => {
    return !t.isComplete;
  });
  const ToDayTodo = TodoList.filter((t) => {
    return t.date === today;
  });
  const UpCommingToDo = TodoList.filter((t) => {
    return t.date > today;
  });
  let DisplayToDo = TodoList;
  if (RenderTodo === "Completed") {
    DisplayToDo = CompletedToDo;
  } else if (RenderTodo === "NotCompleted") {
    DisplayToDo = NotCompletedToDo;
  } else if (RenderTodo === "Today") {
    DisplayToDo = ToDayTodo;
  } else if (RenderTodo === "UpComming") {
    DisplayToDo = UpCommingToDo;
  }
  let todo = DisplayToDo.map((t) => {
    return <Card key={t.id} todo={t} />;
  });
  function AddToList() {
    if (
      inputfield.title.trim() !== "" &&
      inputfield.content.trim() !== "" &&
      inputDate &&
      inputDate.isValid()
    ) {
      let newList = [...TodoList];
      newList = {
        id: uuidv4(),
        title: inputfield.title,
        content: inputfield.content,
        isComplete: false,
        date: inputDate.format("YYYY-MM-DD"),
      };
      const newtodoadd = [...TodoList, newList];
      setTodolist(newtodoadd);
      localStorage.setItem("todos", JSON.stringify(newtodoadd));
      setInputfield({ ...inputfield, title: "", content: "" });
      setInputDate(null);
    }
  }
  useEffect(() => {
    setTodolist(JSON.parse(localStorage.getItem("todos")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="Todo">
      <ScrollTodo items={todo} />
      <Grid container style={{ margin: "10px 15px" }} spacing={1}>
        <Grid
          size={{ xs: 4, md: 12 }}
          display="flex"
          justifyContent="space-around"
          alignItems="center"
        >
          <TextField
            value={inputfield.title}
            onChange={(e) => {
              setInputfield({ ...inputfield, title: e.target.value });
            }}
            sx={{
              width: "100%",
              input: { color: "white" },
              label: { color: "white" },
            }}
            color="white"
            label="Add Title *"
            variant="filled"
          />
        </Grid>
        <Grid
          size={{ xs: 8, md: 12 }}
          display="flex"
          justifyContent="space-around"
          alignItems="center"
        >
          <TextField
            value={inputfield.content}
            onChange={(e) => {
              setInputfield({ ...inputfield, content: e.target.value });
            }}
            sx={{
              width: "100%",
              input: { color: "white" },
              label: { color: "white" },
            }}
            color="black"
            label="Details "
            variant="filled"
          />
        </Grid>

        <Grid size={{ xs: 6, md: 6 }} display="flex">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={inputDate}
              onChange={(e) => {
                setInputDate(e);
              }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid
          size={{ xs: 6, md: 6 }}
          style={{}}
          display="flex"
          justifyContent={"center"}
        >
          <Button
            variant="contained"
            onClick={() => {
              AddToList();
            }}
            style={{
              background: "none",
              color: "white",
              width: "100%",
            }}
          >
            <AddIcon />
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
// <input
//   type="date"

//   style={{
//     fontSize: "16px",
//     background: "#455a64",
//     color: "white",
//     height: "35px",
//   }}
// />
