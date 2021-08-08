import * as React from "react"
import {InfoMeta} from "./fakeData"
import InfoSide_bottom_misc from "./InfoSide_bottom_misc"

const InfoSide_bottom: React.FC<{Data: InfoMeta}> = ({Data}) =>{
    return(
        <div className = "OUTINGS-INFO-BOT">
            <InfoSide_bottom_misc Data={Data}/>
        </div>
    )
}

export default InfoSide_bottom