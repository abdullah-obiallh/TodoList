import Paper from "@mui/material/Paper";
import List from "@mui/material/List";

export default function ScrollTodo({ items }) {
  return (
    <Paper
      square
      sx={{
        background: "#546e7a",
        borderRadius: "10px",

        height: 400,
        overflow: "auto",
        boxShadow: "10px 10px 10px #495f69ff",
        margin: "10px",
      }}
    >
      <List>{items}</List>
    </Paper>
  );
}
