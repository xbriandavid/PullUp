import * as React from "react"
import BeginningDate from "./BeginningDate"
import EndingDate from "./EndingDate"
import "./textinput.css"

export default function DatesRange(){
    return(
        <div className="date-range">
            <BeginningDate />
            <EndingDate />
        </div>
    )
}