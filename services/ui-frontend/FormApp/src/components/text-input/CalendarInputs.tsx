import React, {useState, useEffect, useContext} from "react"
import {BreadCrumbsContext} from "../ParentFrame"
import { FormStateContext } from "../ParentFrame"
import BegDate from "./BegDate"
import EndDate from "./EndDate"
import "./textinput.css"
import { BrowserRouter as Router, Route, Switch, Link} from "react-router-dom"

interface CalendarInputsType{
    begDate: Date,
    endDate: Date,
}

const CalendarInputs: React.FC<CalendarInputsType> = ({begDate, endDate}) =>{
    const BreadCrumbsCntxt = useContext(BreadCrumbsContext)
    const FormStateCntxt = useContext(FormStateContext)
    const [beginningDate, changeBDate] = useState(begDate)
    const [endingDate, changeEDate] = useState(endDate)

    function cBDate(value: Date, event: React.ChangeEvent<HTMLInputElement>):void {
        changeBDate(value)
    }
    function cEDate(value: Date, event: React.ChangeEvent<HTMLInputElement>):void {
        changeEDate(value)
    }

    useEffect(() =>{
        BreadCrumbsCntxt.dispatch(2)
    }, [])

    return(
        <div className="form-page1-wrapper">
            <form className="form-frame" style={{marginTop:"64px"}}>
                <h1>Include starting and ending dates</h1>
                <div className="date-range">
                    <BegDate date={beginningDate} changeDate={cBDate}/>
                    <EndDate date={endingDate} changeDate={cEDate}/>
                </div>
                <div className="bttn-wrapper">
                    <Link to="/" className="bttn-attr" 
                        style={{textDecoration:"none", 
                        justifyContent:"center", alignItems:"center"}}>
                        Back
                    </Link>
                    <Link to="/studio" className="bttn-attr" 
                        style={{marginLeft: "auto", textDecoration:"none", 
                        justifyContent:"center", alignItems:"center"}}>
                        Next
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default CalendarInputs