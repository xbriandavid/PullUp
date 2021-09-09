import * as React from "react"
import * as ReactDOM from "react-dom"
import ParentFrame from "./components/ParentFrame"
import { BrowserRouter as Router, Route, Switch} from "react-router-dom"

ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path="/first">
                <ParentFrame/>
            </Route>
        </Switch>
    </Router>,

    document.getElementById("output")
)