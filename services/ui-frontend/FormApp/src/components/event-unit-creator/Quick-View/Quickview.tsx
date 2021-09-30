import * as React from "react"
import { useContext } from "react"
import { DataContext } from "../Event_unit_creator_wrapper"
import "../styles.css"

const Quickview: React.FC<{}> = () => {
    const EventsDataContext = useContext(DataContext)
    return(
        <div className="Quickview-wrapper">
        </div>
    )
}

export default Quickview