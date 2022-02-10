import React, {useEffect, useContext,useReducer, MouseEvent} from "react"
import Quickview from "./Quick-View/Quickview"
import GridTable from "./table/GridTable"
import { BrowserRouter as Router, Route, Switch,Link} from "react-router-dom"
import {BreadCrumbsContext} from "../ParentFrame"
import "./styles.css"

const Event_unit_creator_wrapper: React.FC<{}> = () => {
    const [QVStatus, toggle] = React.useState(true)
    const BreadCrumbsCntxt = useContext(BreadCrumbsContext)

    useEffect(() =>{
        BreadCrumbsCntxt.dispatch(3)
    }, [])
    
    let GridLayout
    const ActivateToggle = (event: MouseEvent<HTMLButtonElement>) =>{
        toggle(! QVStatus)
    }
    if(QVStatus){
        GridLayout =  <div className="Event-units">
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
                <div className="bttn-wrapper-studio">
                    <Link to="/dates" className="bttn-attr-back" 
                        style={{textDecoration:"none", 
                        justifyContent:"center", alignItems:"center"}}>
                        Back
                    </Link>
                    <Link to="/download" className="bttn-attr" 
                        style={{marginLeft: "590px", textDecoration:"none", 
                        justifyContent:"center", alignItems:"center"}}>
                        Continue
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Event_unit_creator_wrapper