import * as React from "react"
import DatePicker from "react-date-picker"

interface DateControl{
    date: Date,
    changeDate(value: Date, event: React.ChangeEvent<HTMLInputElement>):void
}

const BeginningDate: React.FC<DateControl> = ({date, changeDate}) =>{
    return(
        <div>
            <p>Starting</p>
            <DatePicker 
                onChange={changeDate}
                value={date}
                clearIcon={null}
                minDate={new Date()}
            />
        </div>
    )
}

export default BeginningDate