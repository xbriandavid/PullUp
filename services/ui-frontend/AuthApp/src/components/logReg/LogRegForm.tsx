import * as React from "react"
import {Component, MouseEvent} from "react"
import "../styles.css"
import FormControl from "react-bootstrap/FormControl"
import FormCheck from "react-bootstrap/FormCheck"
import axios from 'axios'

interface FormProps{
    user_status: Boolean,
    email_field: string,
    password_field: string,
    email_field_error: string,
    password_field_error: string
}

const AuthEmailFailMessages:{[key:string] : string} = {
    "auth/invalid-email": "Email is not correctly formatted. Try again.",
    "auth/user-not-found": "Your email does not match our records. Try again.",
    "auth/email-already-in-use": "This email is already in use. Try another."
}
const AuthPasswordFailMessages:{[key:string] : string} = {
    "auth/wrong-password": "Your password does not match our records. Try again",
    "auth/weak-password": "Please try a stronger password with at least 6 characters.",
}

const CheckIfEmailError = (ErrorMsg: string): Boolean => {
    const EmailErrors: Array<string> =  Object.keys(AuthEmailFailMessages)
    return EmailErrors.includes(ErrorMsg)
}


export default class LogRegForm extends Component<{}, FormProps>{
    state: FormProps = {
        user_status: true,
        email_field: "",
        password_field: "",
        email_field_error: "",
        password_field_error: ""

    };

    OnClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        this.setState((state) => ({
            user_status: !state.user_status
        }))
    }

    ChangeErrorFields = (ErrorMessage: string) => {
        if(CheckIfEmailError(ErrorMessage)){
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

    sendRequest = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        const link: string = `http://0.0.0.0:3000/auth/login?email=${this.state.email_field}&password=${this.state.password_field}`
        axios.get(link)
            .then((result) =>{
                if (result.data != "auth/successful"){
                    const error_message: string = result.data
                    this.ChangeErrorFields(error_message)
                }
            })
            .catch((error) => {
                console.log(`RESULT : ${error}`)
            })
    }

    fakeRequest = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        /*\
        const link: string = `http://localhost:3000/auth/getc`
        axios.get(link)
            .then((result) => console.log(result))
            .catch((err) => console.log(err))*/
        fetch('http://localhost:8000/test', {
            method:'get',
            redirect:'follow',
            credentials:'include'
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    }

    sendRegisterRequest = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        axios.post(`http://0.0.0.0:3000/auth/register?email=${this.state.email_field}&password=${this.state.password_field}`)
            .then((result) =>{
                if (result.data != "auth/successful"){
                    const error_message: string = result.data
                    this.ChangeErrorFields(error_message)
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
                        <a>Plan your events visually and effectively</a>
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
                            onClick={this.fakeRequest}>
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
                            <button id="Signin" onClick={this.sendRegisterRequest}>Register</button>
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