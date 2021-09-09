import * as React from "react"
import "./textinput.css"
import DatePicker from 'react-date-picker/'
import { useState } from "react"
import BeginningDate from "./BeginningDate"
import BegDate from "./BegDate"
import EndDate from "./EndDate"

interface InputType{
    collectionName: string,
    BeginningDate: Date,
    EndingDate: Date,
    changeName(newCollection: React.ChangeEvent<HTMLInputElement>): void,
    changeBDate(value: Date, event: React.ChangeEvent<HTMLInputElement>): void,
    changeEDate(value: Date, event: React.ChangeEvent<HTMLInputElement>): void
}

const InputField: React.FC<InputType> = ({collectionName, BeginningDate, EndingDate, changeName, changeBDate, changeEDate}) => {
    return(
        <form className="form-frame" style={{marginTop:"64px"}}>
            <h1>Please create a name for your event</h1>
            <label>Collection Name</label>
            <input className="inputbox" value={collectionName} onChange={changeName} type="text"/>
            <h1 style={{marginTop:"48px"}}>Include starting and ending dates</h1>
            <div className="date-range">
                <BegDate date={BeginningDate} changeDate={changeBDate}/>
                <EndDate date={EndingDate} changeDate={changeEDate}/>
            </div>
            <div className="bttn-wrapper">
                <button className="bttn-attr">Next</button>
            </div>
        </form>
    )
}

export default InputField