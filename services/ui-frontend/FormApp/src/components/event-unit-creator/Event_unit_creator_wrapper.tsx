import * as React from "react"
import Quickview from "./Quickview"
import {MouseEvent} from "react"
import "./styles.css"
import GridTable from "./table/GridTable"

const Event_unit_creator_wrapper: React.FC<{}> = () => {
    const [QVStatus, toggle] = React.useState(true)
    let GridLayout
    const ActivateToggle = (event: MouseEvent<HTMLButtonElement>) =>{
        toggle(! QVStatus)
    }
    if(QVStatus){
        GridLayout = <div className="Event-units">
                        <GridTable 
                        QuickViewStatus={QVStatus}
                        Togglefunc={ActivateToggle}
                        />
                        <Quickview />
                    </div>
    }
    else{
        GridLayout = <div className="Event-units">
                        <GridTable 
                        QuickViewStatus={QVStatus}
                        Togglefunc={ActivateToggle}
                        />
                    </div>
    }
    return(
        <div className="Event-unit--creator-parent">
            <div className="Event-unit--creator-wrapper">
                <div className="aux-container">
                    <h1>Add Single Unit Events to your collection</h1>
                </div>
                <div className="aux-container">
                    <div className="border"></div>
                </div>
                {GridLayout}
            </div>
        </div>
    )
}

export default Event_unit_creator_wrapper