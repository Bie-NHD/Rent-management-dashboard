import React from "react";
import {Outlet} from 'react-router-dom'
import Sidebar from "../Sidebar";

export default function Layout(){
    return(<>
    <Sidebar/>
    <div id="detail">
    <Outlet/>
    </div>
    </>);
}