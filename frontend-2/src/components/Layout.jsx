import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
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

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

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

const drawerItems = (
  <List sx={{ paddingRight: "2rem" }}>
    {appRoutes.map((item) => (
      <ListItemButton
        key={item.text}
        components={Link}
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

const Layout = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Container sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Persistent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,

          "& .MuiDrawer-paper": {
            width: drawerWidth,
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
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {drawerItems}
      </Drawer>

      <Main open={open}>
        <Outlet />
      </Main>
    </Container>
  );
};
export default Layout;
