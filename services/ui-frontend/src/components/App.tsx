import * as React from "react"
import './styles.css'
export class App extends React.Component{
    render(){
        return(
            <div id = "container">
                <aside id="aside">
                    <h2>this is the aside</h2>
                </aside>
                <h1 id="maintext">this is a test!</h1>
            </div>

        )
    }
}