import * as React from "react"
import "./breadcrumbs.css"
import Circle from "./Circle"
import Line from "./Line"

interface PageNumber{
    page: Number
}

const BreadCrumbs: React.FC<PageNumber> = ({page}) => {
    if(page == 1){
        return(
            <div className="breadCrumbs">
                <Circle active={true}/>
                <Line active={false}/>
                <Circle active={false}/>
            </div>
        )
    }
    return(
        <div className="breadCrumbs">
            <Circle active={true}/>
            <Line active={true}/>
            <Circle active={true}/>
        </div>
    )
}

export default BreadCrumbs