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
                <Circle active={true} page={1}/>
                <Line active={false}/>
                <Circle active={false} page={2}/>
                <Line active={false}/>
                <Circle active={false} page={3}/>
                <Line active={false}/>
                <Circle active={false} page={4}/>
            </div>
        )
    }
    else if(page == 2){
        return(
            <div className="breadCrumbs">
                <Circle active={true} page={1}/>
                <Line active={true}/>
                <Circle active={true} page={2}/>
                <Line active={false}/>
                <Circle active={false} page={3}/>
                <Line active={false}/>
                <Circle active={false} page={4}/>
            </div>
        )
    }
    else if(page == 3){
        return(
            <div className="breadCrumbs">
                <Circle active={true} page={1}/>
                <Line active={true}/>
                <Circle active={true} page={2}/>
                <Line active={true}/>
                <Circle active={true} page={3}/>
                <Line active={false}/>
                <Circle active={false} page={4}/>
            </div>
        )
    }
    else {
        return(
            <div className="breadCrumbs">
                <Circle active={true} page={1}/>
                <Line active={true}/>
                <Circle active={true} page={2}/>
                <Line active={true}/>
                <Circle active={true} page={3}/>
                <Line active={true}/>
                <Circle active={true} page={4}/>
            </div>
        )
    }
}

export default BreadCrumbs