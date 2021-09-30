import * as React from "react"
import Event_unit from "./Header_unit"
import {MouseEvent, useContext} from "react"
import RowUnit from "./RowUnit"
import "./table.css"
import { DataContext } from "../Event_unit_creator_wrapper"

interface UnitFrameProps{
    QuickViewStatus: Boolean
    Togglefunc(event: MouseEvent<HTMLButtonElement>):void
}

const Units_frame: React.FC<UnitFrameProps> = ({Togglefunc, QuickViewStatus}) => {
    const EventDataContext = useContext(DataContext)
    
    return(
        <div className="gridRow">
            <Event_unit 
                QuickViewStatus={QuickViewStatus}
                Togglefunc={Togglefunc}
            />
            {(Array.from(EventDataContext.EventsData, ([k,v]) => {
                return {k,v}
            })).map((elem) => {
                return (<RowUnit 
                    QuickViewStatus={QuickViewStatus}
                    obj={elem.v}
                    key={elem.v.key}
                />)
            })}
            <RowUnit 
                QuickViewStatus={QuickViewStatus}
                key=""
                obj={
                    {Name:"", isNew:true, 
                    Time:"", Location:"", 
                    Description:"", Attendees:"",
                    key:"NEW"}}
            />
        </div>
    )
}

export default Units_frame
