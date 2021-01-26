import { type } from "os"
import * as React from "react"
import {Component, FunctionComponent} from "react"
import "../styles.css"
import FormControl from "react-bootstrap/FormControl"
import FormCheck from "react-bootstrap/FormCheck"
import FormLabel from "react-bootstrap/FormLabel"
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'

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
                <div id="end">
                    <div id="remember">
                        <FormCheck type="checkbox" label="Remember me"/>
                    </div>
                        <div id="forgot">
                            <p id="forgot">Forgot my password</p>
                        </div>
                </div>
                <div id="Sign-in-Button">
                        <button id="Signin">Sign in</button>
                    </div>
                    <div id="registerbutton">
                        <button className="hyperlinkbttn">Don't have an account ? Register</button>
                    </div>
                
            </section>
        )
    } 
    // when user status is for user registration
    else{
        return(<p>test</p>)
    }
    
}