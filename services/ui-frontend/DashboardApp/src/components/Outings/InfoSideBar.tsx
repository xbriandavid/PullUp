import * as React from "react"
import { useState, MouseEvent} from "react"
import {InfoMeta} from "./fakeData"

import InfoSide_top from "./InfoSide_top"
import InfoSide_photo from "./InfoSide_photo"
import InfoSide_bottom from "./InfoSide_bottom"

interface InfoSideBarProps{
    Data: InfoMeta,
    ToggleCallback(toggleStatus: boolean):void
}

const InfoSideBar: React.FC<InfoSideBarProps> = ({Data, ToggleCallback}) => {
    return (
        <div id="OUTINGS-INFO">
            <InfoSide_top Data={Data} ToggleCallback={ToggleCallback}/>
            <InfoSide_photo Data="1"/>
            <InfoSide_bottom Data={Data} />
        </div>
    )
}

export default InfoSideBar