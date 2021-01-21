import * as React from "react"
import {Component} from "react"

// Subcomponents
import AsideViz from "./logReg/AsideViz"
import Form from "./logReg/Form"

import "./styles.css" //Styles

export default class Login extends Component{
    render(){
        return(
            // 2-column grid 
            <main id = "top-container">
                <AsideViz />
                <section id="login-registration-subcontainer">
                    <div className="log-register-area">
                        <section className="">
                            
                        </section>
                    </div>
                </section>
            </main>

        )
    }
}
