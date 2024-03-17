import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { red } from "@mui/material/colors";
import {
  IconHome,
  IconScript,
  IconUsers,
  IconBorderAll,
} from "@tabler/icons-react";

// import './SideBar.module.css';

const appRoutes = [
  {
    icon: <IconBorderAll />,
    text:"Overview"
  },
  {
    icon: <IconUsers />,
    text:"Customers"
  },
  {
    icon: <IconHome />,
    text:"Apartments"
  },
  {
    icon: <IconScript />,
    text:"Contracts"
  }
];

const SideBar = () => {
  return (
    <Box component="aside" 
    sx={{
      flexShrink:0
    }}>
      <List>
        {appRoutes.map((item,index)=>(
          <ListItem key={item.text}>
            <ListItemButton>

            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText>{item.text}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))        }
      </List>
    </Box>
  );
};

export default SideBar;
