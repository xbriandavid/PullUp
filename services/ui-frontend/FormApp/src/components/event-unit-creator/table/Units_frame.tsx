import * as React from "react"
import Event_unit from "./Event_unit"
import "./table.css"

const Units_frame: React.FC<{}> = () => {
    const x: Array<Number> = [1,2,3]
    return(
        <div className="gridRow">
            <Event_unit />
        </div>
    )
}

export default Units_frame