import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import { W_DRAWER } from "../constants/dimensions";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";

import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import AppsIcon from "@mui/icons-material/Apps";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";
import PeopleIcon from "@mui/icons-material/People";

import { Link } from "react-router-dom";

const appRoutes = [
  {
    icon: <AppsIcon />,
    text: "Overview",
    link: "/",
  },
  {
    icon: <PeopleIcon />,
    text: "Customers",
    link: "/customers",
  },
  {
    icon: <HolidayVillageIcon />,
    text: "Apartments",
    link: "/apartments",
  },
  {
    icon: <ReceiptLongIcon />,
    text: "Contracts",
    link: "/contracts",
  },
];

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const drawerItems = (
  <List sx={{ paddingRight: "2rem" }}>
    {appRoutes.map((item) => (
      <ListItemButton
        key={item.text}
        LinkComponent={Link}
        to={item.link}
        sx={{
          "&:hover": {
            // backgroundColor: "primary.light",
          },
          padding: "20px",
        }}
      >
        <ListItemIcon
          sx={{
            color: "inherit",
          }}
        >
          {item.icon}
        </ListItemIcon>
        <ListItemText>{item.text}</ListItemText>
      </ListItemButton>
    ))}
  </List>
);

const Nav = ({ open, theme, handleClose }) => (
  <Drawer
    sx={{
      width: W_DRAWER,
      flexShrink: 0,

      "& .MuiDrawer-paper": {
        width: W_DRAWER,
        boxSizing: "border-box",
        border: "1px solid",
        borderColor: theme.palette.primary.main,
      },
    }}
    variant="persistent"
    anchor="left"
    open={open}
  >
    <DrawerHeader>
      <IconButton onClick={handleClose}>
        {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>
    </DrawerHeader>
    <Divider />
    {drawerItems}
  </Drawer>
);

export default Nav;
