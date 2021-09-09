import * as React from "react"
import TableRow from "./TableRow"
import {Entries, InfoMeta, modEntries,DataEntry} from "./fakeData"
import { useState,useEffect } from "react"


interface TableProps{
    callback(params: InfoMeta):any,
    ToggleCallback(toggleStatus: boolean):void,
    ToggleStatus: boolean,
    outingsFetched: boolean,
    tableData: Array<any>,
    ChangeDataCallback(notBusy:boolean, updatedData: Array<any>):void
}

const Table: React.FC<TableProps> = ({callback, ToggleCallback, ToggleStatus, outingsFetched, tableData, ChangeDataCallback}) => {
    const TableLoad = function(){
        return(
            <p>Currently fetching data...</p>
        )
    }
    return(
        <div className="MiddleBlock">
        <table>
            <tbody>
                <tr>
                    <th id="Title">Title</th>
                    <th id="dat">Date</th>
                    <th id="LA">Last Accessed</th>
                    <th id="NoEvents">No.Events</th>
                </tr>
                {outingsFetched ? 
                    tableData.map(function(event, idx){
                        return (<TableRow Title={event.Title}
                        Date={event.Date}
                        LastAccess={event.LastAccess}
                        NumberOfEntries={event.NumberOfEntries}
                        callback={callback}
                        Meta = {event.Meta}
                        Key={idx}
                        ToggleCallback={ToggleCallback}
                        ToggleStatus={ToggleStatus}
                        />)
                    })
                : 
                <TableLoad />}
            </tbody>
        </table>
        </div>
    )
}

export default Table