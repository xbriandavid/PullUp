import * as React from "react"
import { useState, MouseEvent} from "react"
import {InfoMeta} from "./fakeData"

import Table from "./Table"

interface TableGridProps{
    callback(params:InfoMeta):any,
    ToggleCallback(toggleStatus: boolean):void,
    ToggleStatus: boolean,
    outingsFetched: boolean,
    tableData: Array<any>,
    ChangeDataCallback(notBusy:boolean, updatedData: Array<any>):void
}

const TableGrid: React.FC<TableGridProps> = ({callback, ToggleCallback, ToggleStatus, outingsFetched, tableData, ChangeDataCallback}) => {
    
    return(
        <div className="OUTINGS-TABLE">
            <span id="OUT-HEADER">My Outings</span>
            <div className="timeframe-header">
                <div id="UE" className="timeframe-header-text">
                    <span>Upcoming</span>
                </div>
                <div id="ARC" className="timeframe-header-text">
                    <span>Archived</span>
                </div>
            </div>
            <Table 
            callback={callback}
            ToggleCallback={ToggleCallback}
            ToggleStatus={ToggleStatus}
            outingsFetched = {outingsFetched}
            tableData = {tableData}
            ChangeDataCallback = {ChangeDataCallback}
            />
        </div>
    )
}

export default TableGrid