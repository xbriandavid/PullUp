import React, {useEffect, useContext, MouseEvent} from "react"
import {BreadCrumbsContext, FormStateContext} from "../ParentFrame"
import { BrowserRouter as Router, Route, Switch, Link} from "react-router-dom"
import {saveAs} from "file-saver"
import axios from "axios"
import "./styles.css"
import { type } from "os"

const DownloadFrame: React.FC<{}> = () =>{
    const BreadCrumbsCntxt = useContext(BreadCrumbsContext)
    const FormStateCntxt = useContext(FormStateContext)
    
    useEffect(() =>{
        BreadCrumbsCntxt.dispatch(4)
    }, [])

    function DownloadPDF(event: MouseEvent<HTMLButtonElement>): void{
        event.preventDefault()
        const arr = Array.from(FormStateCntxt.FormState.data, function([_, input], idx){
            input['ItemNum'] = (idx+1).toString()
            return input
        })
        const date = FormStateCntxt.FormState.BegDate.toString()
        const data = {
            "EventTitle":FormStateCntxt.FormState.Title,
            "EventTime": date,
            "EventList": arr
        }
        axios({
            method:'post',
            url:'http://localhost:3000/getpdf',
            responseType:'blob',
            data:data
        }).then(res => {
            console.log(res.data)
            const pdfBlob = new Blob([res.data], {type:'application/pdf'})
            saveAs(pdfBlob, 'newpdf.pdf')
        })
        .catch(err => console.log(err))
    }
    return(
        <div>
            <div className="PDFPage-parent">
                <h1>Download or view your Event Collection PDF</h1>
                <button className="PDFBttn" onClick={DownloadPDF}>Save PDF</button>
                <button className="PDFBttn">View PDF</button>
            </div>
            <div className="bttn-wrapper-studio">
                <Link to="/studio" className="bttn-attr-back" 
                    style={{textDecoration:"none", 
                    justifyContent:"center", alignItems:"center"}}>
                    Back
                </Link>
            </div>
        </div>
    )
}

export default DownloadFrame