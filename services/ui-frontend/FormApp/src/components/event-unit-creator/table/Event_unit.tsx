import * as React from "react"
import "./table.css"

const Event_unit: React.FC<{}> = () => {
    return(
        <div className="gridHeader">
            <h2>Name</h2>
            <h2>Time</h2>
            <h2>Location</h2>
            <h2>Description</h2>
        </div>
    )
}

export default Event_unit