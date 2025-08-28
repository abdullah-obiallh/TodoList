import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
//another import
import { useToast, useTodo } from "../Context/TodoContext";
import { useMemo, useState, useEffect } from "react";
import Card from "./Card";
import { v4 as uuidv4 } from "uuid";
import ScrollTodo from "./ScrollTodo";
//date
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
//animatoon
import Grow from "@mui/material/Grow";

//dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function Todo({ RenderTodo }) {
  const [dialogtodo, setdialogtodo] = useState(null);

  const { HideShowToast } = useToast();

  const { TodoList, setTodolist } = useTodo();
  const [inputDate, setInputDate] = useState(dayjs());
  const [AddinputDate, setAddInputDate] = useState(null);
  const [ClickToShowDelete, SetClickToShowDelete] = useState(false);
  const [deleteAnimation, setDeleteAnimation] = useState({});
  const [ClickToShowEdit, SetClickToShowEdit] = useState(false);
  const [Editinput, SetEditinput] = useState({});
  const [inputfield, setInputfield] = useState({ title: "", content: "" });

  let today = dayjs().format("YYYY-MM-DD");

  const CompletedToDo = useMemo(() => {
    return TodoList.filter((t) => {
      return t.isComplete;
    });
  }, [TodoList]);

  const NotCompletedToDo = useMemo(() => {
    return TodoList.filter((t) => {
      return !t.isComplete;
    });
  }, [TodoList]);
  const ToDayTodo = useMemo(() => {
    return TodoList.filter((t) => {
      return t.date === today;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [TodoList]);
  const UpCommingToDo = useMemo(() => {
    return TodoList.filter((t) => {
      return t.date > today;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [TodoList]);
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
  //delete dialog option
  function handelopendeletedialog(todo) {
    setdialogtodo(todo);
    SetClickToShowDelete(true);
  }
  function handelclosedDeleteialog() {
    SetClickToShowDelete(false);
  }
  function handelDELEATEtodo() {
    setDeleteAnimation((prev) => ({
      ...prev,
      [dialogtodo.id]: false,
    }));
    HideShowToast("Done");
    SetClickToShowDelete(false);
  }
  //delete dialog option
  //edit dialog option
  function HandelOpenEditDialog(editTodo) {
    SetEditinput(editTodo);
    setInputDate(dayjs(editTodo.date));
    SetClickToShowEdit(true);
  }
  function HandelclosedEditDialog() {
    SetClickToShowEdit(false);
  }
  function ChangetodoTitleandContent() {
    const changedtodolist = TodoList.map((item) => {
      if (item.id === Editinput.id) {
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
    HideShowToast("Editing Done", "blue");
    HandelclosedEditDialog();
  }
  //edit dialog
  let todo = DisplayToDo.map((t) => {
    return (
      <Grow
        key={t.id}
        in={deleteAnimation[t.id] !== false}
        timeout={700}
        onExited={() => {
          const newtodolist = TodoList.filter(
            (item) => item.id !== dialogtodo.id
          );
          setTodolist(newtodolist);
          localStorage.setItem("todos", JSON.stringify(newtodolist));
          setDeleteAnimation({});
          //delete dialog todo function
        }}
      >
        <div>
          <Card
            todo={t}
            handelopendeletedialog={handelopendeletedialog}
            handelopeneditdialog={HandelOpenEditDialog}
          />
        </div>
      </Grow>
    );
  });

  function AddToList() {
    if (
      inputfield.title.trim() !== "" &&
      AddinputDate &&
      AddinputDate.isValid()
    ) {
      let newList = [...TodoList];
      newList = {
        id: uuidv4(),
        title: inputfield.title,
        content: inputfield.content,
        isComplete: false,
        date: AddinputDate.format("YYYY-MM-DD"),
      };

      const newtodoadd = [...TodoList, newList];
      setTodolist(newtodoadd);
      localStorage.setItem("todos", JSON.stringify(newtodoadd));
      setInputfield({ ...inputfield, title: "", content: "" });
      HideShowToast("Addiding Done");
      setInputDate({});
      setAddInputDate(null);
    }
  }
  useEffect(() => {
    const savefromnull = JSON.parse(localStorage.getItem("todos")) ?? [];
    setTodolist(savefromnull);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="Todo">
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
      <Grow in={true} key={[RenderTodo]} timeout={700}>
        <div>
          <ScrollTodo items={todo} />
        </div>
      </Grow>
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
              value={AddinputDate}
              onChange={(e) => {
                setAddInputDate(e);
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
