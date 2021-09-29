import * as React from "react"
import Event_unit from "./Header_unit"
import {EmptyMap, EventData} from "./EventObject"
import {MouseEvent, useState} from "react"
import RowUnit from "./RowUnit"
import "./table.css"
const deepcopy = require('lodash.clonedeep')

interface UnitFrameProps{
    QuickViewStatus: Boolean
    Togglefunc(event: MouseEvent<HTMLButtonElement>):void
}

const Units_frame: React.FC<UnitFrameProps> = ({Togglefunc, QuickViewStatus}) => {
    const [UnitsMap, UpdateMap] = useState(EmptyMap)

    const removeMapEntry = (ItemUUID: String):void => {
        const newMap = deepcopy(UnitsMap)
        newMap.delete(ItemUUID)
        UpdateMap(newMap)
    }

    const addMapEntry = (NewEntry: EventData):void =>{
        const newMap = deepcopy(UnitsMap)
        newMap.set(NewEntry.key, NewEntry)
        UpdateMap(newMap)
    }

    return(
        <div className="gridRow">
            <Event_unit 
                QuickViewStatus={QuickViewStatus}
                Togglefunc={Togglefunc}
            />
            {(Array.from(UnitsMap, ([k,v]) => {
                return {k,v}
            })).map((elem) => {
                return (<RowUnit 
                    QuickViewStatus={QuickViewStatus}
                    addMapEntry = {addMapEntry}
                    removeEntry = {removeMapEntry}
                    obj={elem.v}
                    key={elem.v.key}
                />)
            })}
            <RowUnit 
                QuickViewStatus={QuickViewStatus}
                addMapEntry = {addMapEntry}
                removeEntry = {removeMapEntry}
                key=""
                obj={{Name:"", isNew:true, Time:"", Location:"", Description:"", Attendees:"",key:"NEW"}}
            />
        </div>
    )
}

export default Units_frame
