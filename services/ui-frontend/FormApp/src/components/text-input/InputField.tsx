import * as React from "react"
import "./textinput.css"
import DatePicker from 'react-date-picker/'
import { useState } from "react"
import DatesRange from './DatesRange'
interface InputType{
    type: String
}

const InputField: React.FC<InputType> = ({type}) => {
    const [value, onChange] = useState(new Date())
    return(
        <form style={{marginTop:"64px"}}>
            <h1>Please create a name for your event</h1>
            <label>Collection Name</label>
            <input className="inputbox" type="text"/>
            <h1 style={{marginTop:"48px"}}>Include starting and ending dates</h1>
            <DatesRange />
            <div className="bttn-wrapper">
                <button className="bttn-attr">Next</button>
            </div>
        </form>
    )
}

export default InputField