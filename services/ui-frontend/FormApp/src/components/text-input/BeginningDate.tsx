import * as React from "react"
import DatePicker from 'react-date-picker/'
import { useState } from "react"

export default function BeginningDate(){
    const [beg_value, changeBeginning] = useState(new Date())
    return(
        <div>
            <p>Starting</p>
            <DatePicker 
                onChange={changeBeginning}
                value={beg_value}
                clearIcon={null}
            />
        </div>
    )
}