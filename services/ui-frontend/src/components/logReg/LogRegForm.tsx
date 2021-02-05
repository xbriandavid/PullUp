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

function handleChange(event: React.ChangeEvent<HTMLInputElement>){
    console.log(event.target.value)
}

interface FormProps{
    user_status: Boolean
}

export default class LogRegForm extends Component<{}, FormProps>{
    state: FormProps = {
        user_status: true
    };

    OnClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        this.setState((state) => ({
            user_status: !state.user_status
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
                            <button id="Signin">Register</button>
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