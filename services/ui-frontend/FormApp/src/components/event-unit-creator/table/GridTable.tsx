import * as React from "react"
import "./table.css"
import Units_frame from "./Units_frame"
import Unit_menu from "./Unit_menu"
export default function GridTable(){
    return(
        <div className="grid">
            <Units_frame />
            <Unit_menu />
        </div>
    )
}