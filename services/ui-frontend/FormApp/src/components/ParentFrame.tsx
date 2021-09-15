import * as React from "react"
import "./styles.css"
import BreadCrumbs from "./bread-crumbs/BreadCrumbs"
import InputField from "./text-input/InputField"
import Event_unit_creator_wrapper from "./event-unit-creator/Event_unit_creator_wrapper"
import { useState } from "react"

export default function ParentFrame(){
    const [pageNumber, changePage] = useState(2)
    const [collectionName, changeName] = useState("")
    const [beginningDate, changeBDate] = useState(new Date())
    const [endingDate, changeEDate] = useState(new Date())


    function cName(event: React.ChangeEvent<HTMLInputElement>):void {
        changeName(event.target.value)
    }
    function cBDate(value: Date, event: React.ChangeEvent<HTMLInputElement>):void {
        changeBDate(value)
    }
    function cEDate(value: Date, event: React.ChangeEvent<HTMLInputElement>):void {
        changeEDate(value)
    }

    let input_component
    if(pageNumber == 1){
        input_component = <div className="form-page1-wrapper">
                     <InputField 
                        collectionName={collectionName}
                        BeginningDate={beginningDate} 
                        EndingDate={endingDate}
                        changeName={cName}
                        changeBDate={cBDate}
                        changeEDate={cEDate}
                    />
                </div>
    }
    else{
        input_component = <Event_unit_creator_wrapper />
    }

    return(
        <div className="parent-frame">
            <div className="breadcrumb-wrapper">
                <BreadCrumbs page={pageNumber}/>
            </div>
            {input_component}
        </div>
    )
}
