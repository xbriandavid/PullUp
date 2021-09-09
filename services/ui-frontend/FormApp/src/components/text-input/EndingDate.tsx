import * as React from "react"
import DatePicker from 'react-date-picker/'
import { useState } from "react"

export default function EndingDate(){
    const [end_value, changeEnd] = useState(new Date())
    return(
        <div style={{marginLeft:"auto"}}>
            <p>Ending</p>
            <DatePicker 
                onChange={changeEnd}
                value={end_value}
                clearIcon={null}
            />
        </div>
    )
}