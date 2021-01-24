import { type } from "os"
import * as React from "react"
import {Component, FunctionComponent} from "react"
import "../styles.css"
import FormControl from "react-bootstrap/FormControl"
import FormLabel from "react-bootstrap/FormLabel"
import Form from 'react-bootstrap/Form'

function handleChange(event: React.ChangeEvent<HTMLInputElement>){
    console.log(event.target.value)
}

type FormProps = {
    user_status: Boolean
}

export default function LogRegForm({
    user_status
}: FormProps){
    // when user_status is for user login
    if(user_status){
        return(
            <section className="form-container">
                <div className="login-text-container">
                    <p>Log in</p>
                </div>
                <div id="tagline">
                    <p>Plan your events visually and effectively</p>
                </div>
                <span id="email">Email</span>
                <form id="loginField">
                    <FormControl type="email" placeholder="Enter Email"/>
                </form>
                <span id="password">Password</span>
                <form id="passwordField">
                    <FormControl type="password" placeholder="Enter Password"/>
                </form>

            </section>
        )
    } 
    // when user status is for user registration
    else{
        return(<p>test</p>)
    }
    
}