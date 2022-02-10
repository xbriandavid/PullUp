import React, {useEffect, useContext} from "react"
import "./textinput.css"
import {BreadCrumbsContext, FormStateContext} from "../ParentFrame"
import { BrowserRouter as Router, Route, Switch, Link} from "react-router-dom"

interface InputType{
    collectionName: string,
}

const InputField: React.FC<InputType> = ({collectionName}) => {
    const BreadCrumbsCntxt = useContext(BreadCrumbsContext)
    const FormStateCntxt = useContext(FormStateContext)
    
    useEffect(() =>{
        BreadCrumbsCntxt.dispatch(1)
    }, [])

    function cName(event: React.ChangeEvent<HTMLInputElement>):void {
        FormStateCntxt.FormStateDispatch({
            __typename:"title",
            type:"Title",
            payload: event.target.value
        })
    }

    return(
        <form className="form-frame" style={{marginTop:"64px"}}>
            <h1 style={{width:"430px"}}>Please create a name for your event</h1>
            <label>Collection Name</label>
            <input className="inputbox" value={collectionName} onChange={cName} type="text"/>
            <div className="bttn-wrapper">
                <Link to='/dates' className="bttn-attr"
                    style={{marginLeft: "auto", textDecoration:"none", 
                    justifyContent:"center", alignItems:"center"}}>
                    Next
                </Link>
            </div>
        </form>
    )
}

export default InputField
