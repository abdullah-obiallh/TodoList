//import SideBar from "./SideBar";
import ContentBar from "./ContentBar";
//animatoon
import Grow from "@mui/material/Grow";
export default function Bar() {
  return (
    <div className="Bar">
      <Grow in={true} timeout={1200}>
        <div>
          <ContentBar />
        </div>
      </Grow>
      {/* <SideBar /> */}
    </div>
  );
}
