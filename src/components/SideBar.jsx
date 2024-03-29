import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import AppsIcon from "@mui/icons-material/Apps";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";
import PeopleIcon from "@mui/icons-material/People";
import { Link } from "react-router-dom";

// import './SideBar.module.css';

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

const SideBar = () => {
  return (
    <Box
      component="nav"
      sx={{
        flexShrink: 0,
        // backgroundColor: "primary.light",
        border: "1px solid",
        // borderColor: "primary.dark",
        // position: "sticky",
        margin: 0,
        // height: "100%",
      }}
    >
      <Drawer variant="permanent" open>
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
      </Drawer>
    </Box>
  );
};

export default SideBar;
