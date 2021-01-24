import * as React from "react"
import * as ReactDOM from "react-dom"
import {BrowserRouter} from "react-router-dom"
import Routing from "./Routing"
import 'bootstrap/dist/css/bootstrap.css'

ReactDOM.render(
    <BrowserRouter>
        <Routing />
    </BrowserRouter>, 
    document.getElementById("output")
)