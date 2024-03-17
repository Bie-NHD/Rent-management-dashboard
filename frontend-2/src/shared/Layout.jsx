import { Container } from "@mui/material";
import SideBar from "./SideBar/SideBar";

const  Layout = ({children}) => {
    

    return (<Container>
        <SideBar/>
        {children}
    </Container>);
}