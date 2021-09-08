import * as React from "react"
import "./breadcrumbs.css"

interface LineColor{
    active: boolean
}

const Line: React.FC<LineColor> = ({active}) =>{
    if(! active){
        return(
            <div className="line" style={{border: "2px solid #848484"}}></div>
        )
    }
    return(
        <div className="line" style={{border: "2px solid #2B46CF"}}></div>
    )
}

export default Line