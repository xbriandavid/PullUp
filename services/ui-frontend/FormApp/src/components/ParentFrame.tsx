import * as React from "react"
import "./styles.css"
import BreadCrumbs from "./bread-crumbs/BreadCrumbs"
import InputField from "./text-input/InputField"

export default function ParentFrame(){
    return(
        <div className="parent-frame">
            <div className="child-frame">
                <BreadCrumbs page={1}/>
                <InputField type={"Collection"}/>
            </div>
        </div>
    )
}