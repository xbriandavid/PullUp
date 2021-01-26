import * as React from "react"
import {Component} from "react"

// Subcomponents
import AsideViz from "./logReg/AsideViz"
import LogRegForm from "./logReg/LogRegForm"

import "./styles.css" //Styles



export default class Login extends React.Component{

    render(){
        return(
            // 2-column grid 
            <main id = "top-container">
                <AsideViz />
                <section id="login-registration-subcontainer">
                    <div className="log-register-area">
                        <LogRegForm user_status={false} />
                    </div>
                </section>
            </main>

        )
    }
}
