import * as React from "react"
import {InfoMeta, Event_meta} from "./fakeData"

interface RowProps{
    Title: string,
    Date: string,
    LastAccess: string,
    NumberOfEntries: number,
    callback(params:InfoMeta):any,
    Meta: Event_meta
    Key: number,
    ToggleCallback(toggleStatus: boolean):void,
    ToggleStatus: boolean
}

const TableRow: React.FC<RowProps> = ({Title, Date, LastAccess, NumberOfEntries, callback, Meta, Key, ToggleCallback, ToggleStatus}) =>{
    function handleRow(){
        callback({
            Title: Title,
            Meta:{
                Created: Meta.Created,
                NumberOfEntries: Meta.NumberOfEntries,
                Modified: Meta.Modified
            }
        })
        if(! ToggleStatus){
            ToggleCallback(true)
        }
    }
    return(
        <tr onClick={handleRow}>
            <td className="resize">{Title}</td>
            <td className="Date">{Date}</td>
            <td className="LastAccess">{LastAccess}</td>
            <td className="NumEntries">{NumberOfEntries}</td>
        </tr>
    )
}

export default TableRow