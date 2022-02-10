import React, {MouseEvent, useContext} from "react"
import Event_unit from "./Header_unit"
import RowUnit from "./RowUnit"
import "./table.css"
import { FormStateContext } from "../../ParentFrame"

interface UnitFrameProps{
    QuickViewStatus: Boolean
    Togglefunc(event: MouseEvent<HTMLButtonElement>):void
}

const Units_frame: React.FC<UnitFrameProps> = ({Togglefunc, QuickViewStatus}) => {
    const FormStateCntxt = useContext(FormStateContext)
    return(
        <div className="gridRow">
            <Event_unit 
                QuickViewStatus={QuickViewStatus}
                Togglefunc={Togglefunc}
            />
            {(Array.from(FormStateCntxt.FormState.data, ([k,v]) => {
                            return {k,v}})).map((elem) => {
                                            return (<RowUnit 
                                                QuickViewStatus={QuickViewStatus}
                                                obj={elem.v}
                                                key={elem.v.key}
                                            />)})}
            <RowUnit 
                QuickViewStatus={QuickViewStatus}
                key=""
                obj={
                        {
                            Name:"", isNew:true, 
                            Time:"", Location:"", 
                            Description:"", Attendees:"", Contact:"",
                            key:"NEW"
                    }
                }
            />
        </div>
    )
}

export default Units_frame
