import * as React from "react"
import "./table.css"
import {MouseEvent} from "react"
import Units_frame from "./Units_frame"

interface GridProps{
    QuickViewStatus: Boolean
    Togglefunc(event: MouseEvent<HTMLButtonElement>):void
}

const GridTable: React.FC<GridProps> = ({QuickViewStatus, Togglefunc}) =>{
    if(QuickViewStatus){
        return(<div className="grid">
                        <Units_frame 
                        QuickViewStatus={QuickViewStatus}
                        Togglefunc={Togglefunc}/>
                     </div>)
    }
    else{
        return(<div className="grid-expand">
                        <Units_frame 
                        QuickViewStatus={QuickViewStatus}
                        Togglefunc={Togglefunc}/>
                     </div>)
    }
}

export default GridTable