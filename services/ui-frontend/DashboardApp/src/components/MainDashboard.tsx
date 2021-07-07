import * as React from "react"
import SidebarMenu from "./SidebarMenu"
import "./styles.css"

export default class MainDashboard extends React.Component{
    render(){
        return(
            <div className="MainContainer">
                <SidebarMenu />
            </div>
        )
    }
}