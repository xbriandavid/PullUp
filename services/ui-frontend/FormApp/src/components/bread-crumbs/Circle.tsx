import * as React from "react"
import "./breadcrumbs.css"

interface CircleColor{
    active: boolean
}

const Circle: React.FC<CircleColor> = ({active}) =>{
    if(! active){
        return(
            <span className="dot" style={{border: "3px solid #848484"}}></span>
        )
    }
    return(
        <span className="dot" style={{border: "3px solid #2B46CF"}}></span>
    )
}

export default Circle