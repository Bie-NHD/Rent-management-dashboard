import { styled } from "@mui/material/styles";
import { W_DRAWER } from "../constants/dimensions";

const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  flexGrow: 1,
  alignItems: "start",
  minHeight: "5rem",
  height: "100%",
  padding: theme.spacing(3),

  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `0px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: W_DRAWER,
  }),
}));

export default Main;
