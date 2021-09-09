import * as React from "react"
import {Component} from "react"
import { BrowserRouter as Router} from "react-router-dom"
import "./styles.css"

import SidebarMenu from "./SidebarMenu"
import SelectedPage from "./SelectedPage"

interface DashboardState {
    Current_Page: string,
    cp2: string,
    outingsFetched: boolean,
    tableData: Array<any>
}

export default class MainDashboard extends Component<{}, DashboardState>{
    state: DashboardState = {
        Current_Page: "Outings",
        cp2: "Home",
        outingsFetched: false,
        tableData: []
    }

    componentDidMount(){
        fetch("http://localhost:5000/fakedata")
        .then((response) => response.json())
        .then((data) => {
            this.setState({
                outingsFetched:true,
                tableData: [data]
            })
        })
        .catch((err) => console.log(err))
    }
    changeCp2 = (childData: string) => {
        this.setState({cp2: childData})
    }
    updateUserEvents = (notBusy:boolean, updatedData: Array<any>) => {
        this.setState({
            outingsFetched: notBusy,
            tableData: updatedData
        })
    }
    render(){
        return(
            <Router>
                <div className="MainContainer">
                    <SidebarMenu Current_Page={this.state.Current_Page}/>
                    <SelectedPage 
                    outingsFetched = {this.state.outingsFetched}
                    tableData = {this.state.tableData}
                    ChangeDataCallback = {this.updateUserEvents.bind(this)}
                    />
                </div>
            </Router>
        )
    }
}