import * as React from "react"
import {InfoMeta} from "./fakeData"


const InfoSide_bottom_misc: React.FC<{Data: InfoMeta}> = ({Data}) =>{
    return(
        <div className = "OUTINGS-INFO-MISC">
            <span id="MISC-Created">Created</span>
            <span>{Data.Meta.Created}</span>
            <span id="MISC-Num">Num. events</span>
            <span>{Data.Meta.NumberOfEntries}</span>
            <span id="MISC-Mod">Modified</span>
            <span>{Data.Meta.Modified}</span>
        </div>
    )
}
export default InfoSide_bottom_misc