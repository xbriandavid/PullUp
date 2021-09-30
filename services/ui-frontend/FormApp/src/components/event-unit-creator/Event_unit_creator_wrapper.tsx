import * as React from "react"
import { useReducer } from "react"
import Quickview from "./Quick-View/Quickview"
import {MouseEvent} from "react"
import "./styles.css"
import GridTable from "./table/GridTable"
import {EventData, EmptyMap} from "./table/EventObject"
const deepcopy = require('lodash.clonedeep')


export const DataContext = React.createContext(undefined)
const initialState = EmptyMap
const reducer = (state: Map<string, EventData>, 
    action:{id:string, mapObj?:EventData}) =>{
        const newMap = deepcopy(state)
        if(action.mapObj){
            newMap.set(action.id, action.mapObj)
            return newMap
        }
        else{
            newMap.delete(action.id)
            console.log(newMap)
            return newMap
        }
}


const Event_unit_creator_wrapper: React.FC<{}> = () => {
    const [EventsData, dispatch] = useReducer(reducer, initialState)
    const [QVStatus, toggle] = React.useState(true)
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
        <DataContext.Provider value={{EventsData, dispatch}}>
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
        </DataContext.Provider>
    )
}

export default Event_unit_creator_wrapper