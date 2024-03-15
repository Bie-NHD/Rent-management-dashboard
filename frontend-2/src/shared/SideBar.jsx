import { List, ListItemButton, ListItemIcon } from "@mui/material";
import { IconHome, IconScript, IconUsers, IconBorderAll } from '@tabler/icons-react';

const SideBar = () => {
return (
    <aside>
<List>
    <ListItemButton>
        <ListItemIcon>   
             <IconBorderAll/>
        </ListItemIcon>
        Overview
    </ListItemButton>
    <ListItemButton>
        <ListItemIcon>      
        <IconUsers/>      

        </ListItemIcon>
        Customers
    </ListItemButton>
    <ListItemButton>
        <ListItemIcon>     
            <IconHome/>     
        </ListItemIcon>
        Apartments
    </ListItemButton>
    <ListItemButton>
        <ListItemIcon> 
            <IconScript/>         
        </ListItemIcon>
        Contracts
    </ListItemButton>
</List>
    </aside>
);
}

export default SideBar;