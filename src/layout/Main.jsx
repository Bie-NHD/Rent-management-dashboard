import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import { drawerWidth } from "../utils/constants";

const Main = styled(Container, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  flexGrow: 1,
  alignItems: "start",
  minHeight: "5rem",
  height: "100%",
  padding: theme.spacing(3),
  marginTop: theme.spacing(10),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

export default Main;