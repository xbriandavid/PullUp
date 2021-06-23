import * as React from "react"
import {NavLink, Switch, Route} from "react-router-dom"
import Login from "./Login"

export default function Routing(){
    return(
    <Switch>
        <Route exact path='/' >
            <Login />
        </Route>
    </Switch>
    )
}