import * as React from "react"
import InfoSide_toggle from "./InfoSide_toggle"
import {InfoMeta} from "./fakeData"

interface InfoSideTopProps{
    Data: InfoMeta,
    ToggleCallback(toggleStatus: boolean):void
}

const InfoSide_top: React.FC<InfoSideTopProps> = ({Data, ToggleCallback}) =>{
    return(
        <div className = "OUTINGS-INFO-TOP">
            <span>{Data.Title}</span>
            <InfoSide_toggle ToggleCallback={ToggleCallback}/>
        </div>
    )
}

export default InfoSide_top