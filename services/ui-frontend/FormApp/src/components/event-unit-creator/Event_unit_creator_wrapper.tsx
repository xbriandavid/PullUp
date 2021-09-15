import * as React from "react"
import Quickview from "./Quickview"
import Events_units_table from "./table/Event_units_table"
import "./styles.css"
import GridTable from "./table/GridTable"

const Event_unit_creator_wrapper: React.FC<{}> = () => {
    return(
        <div className="Event-unit--creator-parent">
            <div className="Event-unit--creator-wrapper">
                <div className="aux-container">
                    <h1>Add Single Unit Events to your collection</h1>
                </div>
                <div className="aux-container">
                    <div className="border"></div>
                </div>
                <div className="Event-units">
                    <GridTable />
                    <Quickview />
                </div>
            </div>
        </div>
    )
}

export default Event_unit_creator_wrapper