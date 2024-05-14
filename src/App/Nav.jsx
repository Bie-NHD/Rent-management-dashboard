import { styled } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import { W_DRAWER } from "../constants/dimensions";
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
import ContactPageIcon from "@mui/icons-material/ContactPage";

import { Link, useLocation } from "react-router-dom";
import { AppRoutes } from "../constants";
import useAuth from "../hooks/useAuth";
import { Suspense, lazy } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import UserNavPanel from "../features/user/UserNavPanel";
import useUser from "../hooks/useUser";

const styles = {
  ListItemButton: {
    padding: "20px",
    borderTopRightRadius: "50px",
    borderBottomRightRadius: "50px",
    marginY: "10px",

    "&.Mui-selected": {
      bgcolor: "primary.main",
      color: "white",
    },
    ":hover": {
      color: "primary.light",
    },
  },
  ListItemIcon: {
    color: "inherit",
  },
};

const appRoutes = [
  {
    icon: <AppsIcon />,
    text: "Overview",
    link: "/",
  },
  {
    icon: <PeopleIcon />,
    text: "Customers",
    link: AppRoutes.Customer,
  },
  {
    icon: <HolidayVillageIcon />,
    text: "Apartments",
    link: AppRoutes.Apartment,
  },
  {
    icon: <ReceiptLongIcon />,
    text: "Contracts",
    link: AppRoutes.Contract,
  },
];

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
  boxShadow: "none",
}));

const USER_TEXT = "Users";
const USER_LINK = "/users";

const NavItems = () => {
  const location = useLocation().pathname;

  const { isAdmin } = useUser();

  return (
    <List sx={{ paddingRight: "2rem" }}>
      {appRoutes.map((item) => (
        <ListItemButton
          key={item.text}
          LinkComponent={Link}
          to={item.link}
          selected={location == item.link}
          sx={styles.ListItemButton}
        >
          <ListItemIcon sx={styles.ListItemIcon}>{item.icon}</ListItemIcon>
          <ListItemText>{item.text}</ListItemText>
        </ListItemButton>
      ))}
      {isAdmin ? (
        <ListItemButton
          key={USER_TEXT}
          LinkComponent={Link}
          to={USER_LINK}
          selected={location == USER_LINK}
          sx={styles.ListItemButton}
        >
          <ListItemIcon sx={styles.ListItemIcon}>
            <ContactPageIcon />
          </ListItemIcon>
          <ListItemText>{USER_TEXT}</ListItemText>
        </ListItemButton>
      ) : null}
    </List>
  );
};

const Loading = () => (
  <Box>
    <CircularProgress variant="indeterminate" />
  </Box>
);

const Nav = ({ open, theme, handleClose }) => (
  <Drawer
    sx={{
      width: W_DRAWER,
      flexShrink: 0,

      "& .MuiDrawer-paper": {
        width: W_DRAWER,
        boxSizing: "border-box",
        bgcolor: theme.palette.background.default,
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
    <UserNavPanel />
    <Divider />
    <NavItems />
  </Drawer>
);

export default Nav;
