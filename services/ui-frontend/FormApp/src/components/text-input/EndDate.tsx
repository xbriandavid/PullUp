import * as React from "react"
import DatePicker from 'react-date-picker/'

interface DateControl{
    date: Date,
    changeDate(value: Date, event: React.ChangeEvent<HTMLInputElement>):void
}

const EndDate: React.FC<DateControl> = ({date, changeDate}) =>{
    return(
        <div style={{marginLeft:"auto"}}>
            <p>Ending</p>
            <DatePicker 
                onChange={changeDate}
                value={date}
                clearIcon={null}
                minDate={new Date()}
            />
        </div>
    )
}
export default EndDate