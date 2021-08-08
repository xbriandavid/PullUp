import * as React from "react"
import {Component} from "react"
import "../styles.css"
import TableGrid from "./TableGrid"
import InfoSideBar from "./InfoSideBar"
import {InfoMeta} from "./fakeData"


interface OutingsState {
    Data: InfoMeta,
    toggle: boolean
}

interface OutingsProps{
    outingsFetched: boolean,
    tableData: Array<any>,
    ChangeDataCallback(notBusy:boolean, updatedData: Array<any>):void
}

const initState: InfoMeta = {
    Title: "Initial Title Data", 
    Meta: {
        Created: "Jul. 5, 2021, 4:40 PM",
        NumberOfEntries: 8,
        Modified: "Jul 6, 2021, 11:20 AM"
    }
}

export default class Outings extends Component<OutingsProps, OutingsState>{
    constructor(props: OutingsProps){
        super(props)
    }
    state: OutingsState = {
        Data: initState,
        toggle: false
    }
    
    CallBackToChild = (params: InfoMeta) =>{
        this.setState({
            Data: params
        })
    }

    Toggle = (toggleStatus: boolean) => {
        this.setState({
            toggle: toggleStatus
        })
        if(! toggleStatus){
            document.getElementById("SMAHolder").className="SMA-OUTINGS-Tog"
        }
    }

    componentDidMount(){
        document.getElementById("SMAHolder").className="SMA-OUTINGS-Tog"
    }
    

    render(){
        let infoSide;
        if(this.state.toggle){
            infoSide = <InfoSideBar 
                        Data = {this.state.Data}
                        ToggleCallback ={this.Toggle.bind(this)}
                        />
            document.getElementById("SMAHolder").className="SMA-OUTINGS"
        }
        return(
            <div className="SMA-OUTINGS" id="SMAHolder">
                <TableGrid 
                callback={this.CallBackToChild.bind(this)}
                ToggleCallback={this.Toggle.bind(this)}
                ToggleStatus = {this.state.toggle}
                outingsFetched = {this.props.outingsFetched}
                tableData = {this.props.tableData}
                ChangeDataCallback = {this.props.ChangeDataCallback}
                />
                {infoSide}
            </div>
        )
    }
}