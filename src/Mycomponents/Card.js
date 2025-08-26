import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import { useContext } from "react";
import { TodoContext } from "../Context/TodoContext";

export default function Card({
  todo,
  handelopendeletedialog,
  handelopeneditdialog,
}) {
  const { TodoList, setTodolist } = useContext(TodoContext);
  function click() {
    const NewToDo = TodoList.map((item) => {
      if (item.id === todo.id) {
        item.isComplete = !item.isComplete;
      }
      return item;
    });
    setTodolist(NewToDo);
    localStorage.setItem("todos", JSON.stringify(NewToDo));
  }
  // Delete function
  function handelopendialog() {
    handelopendeletedialog(todo);
  }
  // Delete function
  // Edit function
  function handelOpenEdit() {
    handelopeneditdialog(todo);
  }
  // Edit function
  return (
    <div className="Card">
      <Grid container>
        <Grid size={{ xs: 10, md: 10 }} display="flex" flexDirection="column">
          <p
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "25px",
              textDecoration: todo.isComplete ? "line-through" : "",
            }}
          >
            {todo.title}
          </p>
          <p style={{ marginLeft: "10px" }}>{todo.content}</p>
        </Grid>
        {/* icon buttons */}
        <Grid
          size={{ xs: 2, md: 2 }}
          display="flex"
          justifyContent="space-around"
          alignItems="center"
          flexDirection="column"
        >
          {/* Check icon */}
          <IconButton
            onClick={() => {
              click();
            }}
            style={{
              color: todo.isComplete ? "white" : "green",
              background: todo.isComplete ? "green" : "white",
              border: "solid green 1px",
            }}
          >
            <CheckIcon />
          </IconButton>
          {/* Check icon */}
          {/* edit icon */}
          <IconButton
            onClick={handelOpenEdit}
            style={{
              color: "#0d47a1",
              border: "solid #0d47a1 1px",
            }}
          >
            <EditIcon />
          </IconButton>
          {/* edit icon */}
          {/* Delete icon */}
          <IconButton
            onClick={handelopendialog}
            style={{
              color: "#c62828",
              border: "solid #c62828 1px",
            }}
          >
            <DeleteIcon />
          </IconButton>
          {/* Delete icon */}
        </Grid>
        {/* icon button */}
        <Grid size={6}>{todo.date}</Grid>
      </Grid>
    </div>
  );
}
