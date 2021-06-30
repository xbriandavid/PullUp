import * as React from "react"
import {Component, MouseEvent} from "react"
import "../styles.css"
import FormControl from "react-bootstrap/FormControl"
import FormCheck from "react-bootstrap/FormCheck"
import axios from 'axios'
import {AxiosResponse} from 'axios'

interface FormProps{
    login_screen: Boolean,
    email_field: string,
    password_field: string,
    email_field_error: string,
    password_field_error: string
}
const EmailRe = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const AuthEmailFailMessages:{[key:string] : string} = {
    "auth/invalid-email": "Email is not correctly formatted. Try again.",
    "auth/user-not-found": "Your email does not match our records. Try again.",
    "auth/email-already-in-use": "This email is already in use. Try another.",
    "auth/generic-error": "We are currently having issues. Try again later."
}
const AuthPasswordFailMessages:{[key:string] : string} = {
    "auth/wrong-password": "Your password does not match our records. Try again",
    "auth/weak-password": "Please try a stronger password with at least 6 characters.",
    "auth/generic-error": "We are currently having issues. Try again later."
}

// Used for axios response type, verifying authentication
type APIResponse = {
    result: boolean,
    msg: string
}

export default class LogRegForm extends Component<{}, FormProps>{
    state: FormProps = {
        login_screen: true,
        email_field: "",
        password_field: "",
        email_field_error: "",
        password_field_error: ""

    };

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

    // Change login_screen in state to reflect
    // use for logging in or registration
    ChangeAuthScreen = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        this.setState((state) => ({
            login_screen: !state.login_screen,
            email_field: "",
            password_field: "",
            email_field_error: "",
            password_field_error: ""
        }))
    }

    CheckIfEmailError = (ErrorMsg: string): Boolean => {
        const EmailErrors: Array<string> =  Object.keys(AuthEmailFailMessages)
        return EmailErrors.includes(ErrorMsg)
    }

    ChangeErrorFields = (ErrorMessage: string) => {
        if(this.CheckIfEmailError(ErrorMessage)){
            this.setState((state) => ({
                email_field_error: `${AuthEmailFailMessages[ErrorMessage]}`,
                password_field_error: ""
            }))
        }
        else{
            this.setState((state) => ({
                password_field_error: `${AuthPasswordFailMessages[ErrorMessage]}`,
                email_field_error: ""
            }))
        }
    }

    sendLoginRequest = (link: string) => {
        axios.get(link)
        .then((result: AxiosResponse<APIResponse>) =>{
            if (! result.data.result){
                const error_message: string = result.data.msg
                this.ChangeErrorFields(error_message)
            }
        })
        .catch((error) => {
            this.ChangeErrorFields("auth/generic-error")
        })
    }

    sendRegisterRequest = (link: string) => {
        axios.post(link)
        .then((result: AxiosResponse<APIResponse>) =>{
            if (! result.data.result){
                const error_message: string = result.data.msg
                this.ChangeErrorFields(error_message)
            }
        })
        .catch((error) => {
            this.ChangeErrorFields("auth/generic-error")
        })
    }

    //Change to handle both get and post request
    sendAuthRequest = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        if(! EmailRe.test(this.state.email_field)){
            this.ChangeErrorFields("auth/invalid-email")
            return
        }
        const action = (this.state.login_screen) ? "login":"register"
        const link: string = `http://localhost:3000/auth/${action}?email=${this.state.email_field}&password=${this.state.password_field}`
        if(this.state.login_screen){
            this.sendLoginRequest(link)
        }
        else{
            this.sendRegisterRequest(link)
        }
    }
 
    // when login_screen is for user login
    render(){
        if(this.state.login_screen){
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
                        <span className="error-message">{this.state.email_field_error}</span>
                    </form>
                    <span id="password">Password</span>
                    <form id="passwordField">
                        <FormControl 
                        type="password" 
                        placeholder="Enter Password"
                        value = {this.state.password_field}
                        onChange = {this.OnPasswordFieldChange}
                        />
                        <span className="error-message">{this.state.password_field_error}</span>
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
                            onClick={this.sendAuthRequest}>
                                Sign in
                            </button>
                        </div>
                        <div id="registerbutton">
                            <button className="hyperlinkbttn" onClick={this.ChangeAuthScreen}>
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
                    <div className="login-text-container">
                        <p>Register!</p>
                    </div>
                    <div className="tagline">
                        <p>Plan your events visually and effectively</p>
                    </div>
                    <span id="email">Email</span>
                    <form id="loginField">
                        <FormControl type="email" placeholder="Enter Email"
                        value={this.state.email_field}
                        onChange = {this.OnEmailFieldChange}
                        />
                        <span className="error-message">{this.state.email_field_error}</span>
                    </form>
                    <span id="password">Password</span>
                    <form id="passwordField">
                        <FormControl type="password" 
                        placeholder="Enter Password"
                        value = {this.state.password_field}
                        onChange = {this.OnPasswordFieldChange}
                        />
                        <span className="error-message">{this.state.password_field_error}</span>
                    </form>
                    <div id="Sign-in-Button">
                            <button id="Signin" onClick={this.sendAuthRequest}>Register</button>
                        </div>
                        <div id="registerbutton">
                            <button className="hyperlinkbttn" onClick={this.ChangeAuthScreen}>
                                Already have an account ? Login</button>
                        </div>
                </section>
            )
        }
    }
    
}