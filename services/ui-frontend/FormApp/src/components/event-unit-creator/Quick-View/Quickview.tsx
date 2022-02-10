import * as React from "react"
import { useContext} from "react"
import { FormStateContext } from "../../ParentFrame"
import "../styles.css"
import EventCircle from "./EventCircle"
const Quickview: React.FC<{}> = () => {
const FormStateCntxt = useContext(FormStateContext)

    return(
        <div className="Quickview-wrapper">
             <h2 style={{
                 height:"48px", 
                 textAlign:"center",
                 marginBottom:0,
                 width:"100%"}}>QUICK VIEW</h2>
            <div className="Quickview-wrapper" 
            style={{border:"2px solid #848484", 
            borderRadius:"5px",
            flexGrow:1}}>
            {(Array.from(FormStateCntxt.FormState.data, ([k,v]) => {
                return {k,v}
            })).map((elem, idx) => {
                return (<EventCircle
                EventName={elem.v.Name}
                EventTime={elem.v.Time}
                Data={elem.v}
                HasTail={idx < FormStateCntxt.FormState.data.size-1}
                />)
            })}
            </div>
        </div>
    )
}

export default Quickview

/*
 */