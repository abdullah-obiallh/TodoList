import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import { useContext, useState } from "react";
//date
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

//date
import { TodoContext } from "../Context/TodoContext";
//dialog
import Button from "@mui/material/Button"; //button
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField"; //text input
import DialogTitle from "@mui/material/DialogTitle";

//dialog

export default function Card({ todo }) {
  const [inputDate, setInputDate] = useState(dayjs());
  const [ClickToShowDelete, SetClickToShowDelete] = useState(false);
  const [ClickToShowEdit, SetClickToShowEdit] = useState(false);
  const [Editinput, SetEditinput] = useState({
    title: todo.title,
    content: todo.content,
  });

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
    SetClickToShowDelete(true);
  }
  function handelclosedDeleteialog() {
    SetClickToShowDelete(false);
  }
  function handelDELEATEtodo() {
    const newtodolist = TodoList.filter((item) => {
      return item.id !== todo.id;
    });
    setTodolist(newtodolist);
    localStorage.setItem("todos", JSON.stringify(newtodolist));
  }
  // Delete function
  // Edit function
  function HandelclosedEditDialog() {
    SetClickToShowEdit(false);
  }
  function HandelOpenEditDialog() {
    setInputDate(dayjs(todo.date));
    SetClickToShowEdit(true);
  }
  function ChangetodoTitleandContent() {
    const changedtodolist = TodoList.map((item) => {
      if (item.id === todo.id) {
        return {
          ...item,
          title: Editinput.title,
          content: Editinput.content,
          date: inputDate.format("YYYY-MM-DD"),
        };
      }
      return item;
    });
    setTodolist(changedtodolist);
    localStorage.setItem("todos", JSON.stringify(changedtodolist));

    HandelclosedEditDialog();
  }
  // Edit function
  return (
    <div className="Card">
      {/*           dialog              */}
      <Dialog
        open={ClickToShowDelete}
        onClose={handelclosedDeleteialog}
        disableRestoreFocus
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle color="red" id="alert-dialog-title">
          {"are you sure you want to delete it?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If you delete it, you won't be able to get it back.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handelclosedDeleteialog} autoFocus>
            NO
          </Button>
          <Button onClick={handelDELEATEtodo}>YES</Button>
        </DialogActions>
      </Dialog>
      {/*           dialog            */}

      {/* Edit Dialog */}
      <Dialog
        open={ClickToShowEdit}
        onClose={HandelclosedEditDialog}
        disableRestoreFocus
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Edit"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            What do you want to change?
          </DialogContentText>
          <TextField
            value={Editinput.title}
            onChange={(e) => {
              SetEditinput({ ...Editinput, title: e.target.value });
            }}
            autoFocus
            required
            margin="dense"
            id="name"
            label="TitleName"
            fullWidth
            variant="standard"
          />
          <TextField
            value={Editinput.content}
            onChange={(e) => {
              SetEditinput({ ...Editinput, content: e.target.value });
            }}
            required
            margin="dense"
            label="Content"
            fullWidth
            variant="standard"
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={inputDate}
              onChange={(e) => {
                setInputDate(e);
              }}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={HandelclosedEditDialog}>Never Mind</Button>
          <Button onClick={ChangetodoTitleandContent}>Edit</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
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
            onClick={HandelOpenEditDialog}
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
