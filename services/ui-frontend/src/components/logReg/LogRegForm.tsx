import { type } from "os"
import * as React from "react"
import {Component, MouseEvent, FunctionComponent} from "react"
import "../styles.css"
import FormControl from "react-bootstrap/FormControl"
import FormCheck from "react-bootstrap/FormCheck"
import FormLabel from "react-bootstrap/FormLabel"
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { container } from "../styles.css"
import axios from 'axios'

function handleChange(event: React.ChangeEvent<HTMLInputElement>){
    console.log(event.target.value)
}

interface FormProps{
    user_status: Boolean,
    email_field: string,
    password_field: string
}

export default class LogRegForm extends Component<{}, FormProps>{
    state: FormProps = {
        user_status: true,
        email_field: "",
        password_field: ""
    };

    OnClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        this.setState((state) => ({
            user_status: !state.user_status
        }))
    }

    sendRequest = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        axios.get(`http://localhost:3000/auth/login?email=${this.state.email_field}&password=${this.state.password_field}`)
            .then((result) =>{
                if (result.data != "auth/successful"){
                    const error_msg = document.getElementById("err-msg")
                    error_msg.innerHTML = `${result.data}`
                }
            })
            .catch((error) => {
                console.log(`RESULT : ${error}`)
            })
    }

    OnEmailFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState((state) => ({
            email_field: event.target.value
        }))
    }

    OnPasswordFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState((state) => ({
            password_field: event.target.value
        }))
    }
 
    // when user_status is for user login
    render(){
        if(this.state.user_status){
            return(
                <section className="form-container">
                    <div className="login-text-container">
                        <p>Log in</p>
                    </div>
                    <div className="tagline">
                        <p>Plan your events visually and effectively</p>
                    </div>
                    <span id="email">Email</span>
                    <form id="loginField">
                        <FormControl 
                        type="email" 
                        placeholder="Enter Email" 
                        value={this.state.email_field}
                        onChange = {this.OnEmailFieldChange}
                        />
                    </form>
                    <span id="err-msg"></span>
                    <span id="password">Password</span>
                    <form id="passwordField">
                        <FormControl 
                        type="password" 
                        placeholder="Enter Password"
                        value = {this.state.password_field}
                        onChange = {this.OnPasswordFieldChange}
                        />
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
                            <button id="Signin"
                            onClick={this.sendRequest}>
                                Sign in
                            </button>
                        </div>
                        <div id="registerbutton">
                            <button className="hyperlinkbttn" onClick={this.OnClick}>
                                Don't have an account ? Register
                            </button>
                        </div>
                    
                </section>
            )
        } 
        // when user status is for user registration
        else{
            return(
                <section className="reg-container">
                    <div className="tagline">
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
                    <div id="Sign-in-Button">
                            <button id="Signin" onClick={this.sendRequest}>Register</button>
                        </div>
                        <div id="registerbutton">
                            <button className="hyperlinkbttn" onClick={this.OnClick}>
                                Already have an account ? Login</button>
                        </div>
                    
                </section>
            )
        }
    }
    
}