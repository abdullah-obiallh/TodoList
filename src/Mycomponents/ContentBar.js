import MyList from "./MyList";
import Todo from "./Todo";
//
import Grid from "@mui/material/Grid";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useState, useEffect } from "react";

export default function ContentBar() {
  const [RenderTodo, setRenderTodo] = useState();
  const [width, setWidth] = useState(window.innerWidth);

  function handleChangeToggleButton(e) {
    setRenderTodo(e.target.value);
  }

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  let IsColumn = "";
  if (width < 1030) {
    IsColumn = "vertical";
  } else {
    IsColumn = "";
  }

  return (
    <div className="ContentBar">
      <MyList />
      <Grid container>
        <Grid size={{ md: 6, xs: 8 }}>
          <Todo RenderTodo={RenderTodo} />
        </Grid>
        <Grid
          size={{ md: 6, xs: 4 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <ToggleButtonGroup
            color="primary"
            value={RenderTodo}
            orientation={IsColumn}
            exclusive
            onChange={handleChangeToggleButton}
            aria-label="Platform"
            style={{
              marginTop: "10px",
              boxShadow: "0px 10px 4px #455a64",
            }}
          >
            <ToggleButton style={{ fontWeight: "bold" }} value="All">
              ALL
            </ToggleButton>
            <ToggleButton style={{ fontWeight: "bold" }} value="Today">
              Today
            </ToggleButton>
            <ToggleButton style={{ fontWeight: "bold" }} value="UpComming">
              UpComming
            </ToggleButton>
            <ToggleButton style={{ fontWeight: "bold" }} value="Completed">
              Completed
            </ToggleButton>
            <ToggleButton style={{ fontWeight: "bold" }} value="NotCompleted">
              NotCompleted
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </Grid>
    </div>
  );
}
