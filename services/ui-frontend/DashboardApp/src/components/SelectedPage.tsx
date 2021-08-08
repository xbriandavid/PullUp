import * as React from "react"
import {Component} from "react"
import { BrowserRouter as Router, Route, Switch} from "react-router-dom"


import UserPanel from "./UserPanel"
import Outings from "./Outings/Outings"
import Calendar from "./Calendar/Calendar"
import Home from "./Home"
import Settings from "./Settings/Settings"

interface DashboardState{
    outingsFetched: boolean,
    tableData: Array<any>,
    ChangeDataCallback(notBusy:boolean, updatedData: Array<any>):void
}

const SelectedPage: React.FC<DashboardState> = ({outingsFetched, tableData, ChangeDataCallback}) => {
    return(
        <div className="SelectedMenuArea">
            <UserPanel />
            <Switch>
                <Route exact path="/">
                    <Outings 
                    outingsFetched={outingsFetched}
                    tableData = {tableData}
                    ChangeDataCallback = {ChangeDataCallback}
                    />
                </Route>
                <Route exact path="/cal">
                    <Calendar />
                </Route>
                <Route exact path="/settings">
                    <Settings />
                </Route>
            </Switch>
        </div>
    )
}
export default SelectedPage