import * as React from "react"
import {MouseEvent, useEffect, useRef} from "react"
import {EventData} from "./EventObject"
import {ThreeDots, ThreeDotsExapnded, SaveCheckMark, Remove, Edit} from "./Icons"
import "./table.css"
import {v4 as uuidv4} from "uuid"

interface UnitFrameProps{
    QuickViewStatus: Boolean,
    addMapEntry(NewEntry: EventData): void,
    removeEntry(ItemUUID: String): void,
    obj: EventData,
    key:string
}

const RowUnit: React.FC<UnitFrameProps>  = (
    {QuickViewStatus, addMapEntry, removeEntry, obj}) => {
        const [NewEventActive, toggle] = React.useState(obj.isNew)
        const [EditMode, toggleEdit] = React.useState(true)
        const [UnitObject, ch] = React.useState(obj)
        const MenuForEdit = useRef<HTMLDivElement>()

        const clear = () =>{
            ch({Name:"", 
            Time:"",
            Location:"",
            Description:"",
            Attendees:"",
            isNew:true, key:"NEW"})
        }

        const newEventToggle = (event: MouseEvent<HTMLButtonElement>):void => {
            if(UnitObject.key == "NEW"){
                toggle(false)
            }
        }
        const submitToggle = (event: MouseEvent<HTMLButtonElement>) =>{
            if(UnitObject.Name.length == 0){
                
            }else{
                if(UnitObject.key == "NEW"){
                    addMapEntry({...UnitObject, key: uuidv4(), isNew:false})
                    toggle(! NewEventActive)
                }
                else{
                    addMapEntry({...UnitObject})
                }
            }
        }
        const removeToggle = (event: MouseEvent<HTMLButtonElement>) =>{
            if(UnitObject.key == "NEW"){
                toggle(! NewEventActive)
                clear()
            } else{
                removeEntry(UnitObject.key)
            }

        }
        const EditModeToggle = (event: MouseEvent<HTMLButtonElement>) =>{
            toggleEdit(true)
        }

        const NameOnChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
            ch({...UnitObject, Name:event.target.value})
        }
        const TimeOnChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
            ch({...UnitObject, Time:event.target.value})
        }
        const LocationOnChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
            ch({...UnitObject, Location:event.target.value})
        }
        const DescriptionOnChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
            ch({...UnitObject, Description:event.target.value})
        }
        const AttendeesOnChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
            ch({...UnitObject, Attendees:event.target.value})
        }
        
        useEffect(() => {
            ch(obj)
            if(! obj.isNew){
                toggleEdit(false)
            }            
        }, [obj])

        const handleClickMenuEdit = (e:any) =>{
            // Check that ref current object exists
            if(MenuForEdit.current){
                if(! MenuForEdit.current.contains(e.target)){
                   MenuForEdit.current.className = "PopUpBttns"
                }
            }
        }

        useEffect(() =>{
            document.addEventListener("mousedown", handleClickMenuEdit)
            return () =>{
                document.removeEventListener("mousedown", handleClickMenuEdit)
            }
        },[])

        const toggleMenu = ()=>{
            MenuForEdit.current.className = "PopUpBttns-active"
        }
        const present = (event: MouseEvent<HTMLButtonElement>):void =>{
            console.log(UnitObject.Name.length)
        }

        let UnitButton
        if(QuickViewStatus){
            UnitButton = <div className="togglebttn" id="SVG-menu-icon" onClick={toggleMenu}>
                            <button>
                                <ThreeDots />
                            </button>
                        </div>
        }
        else{
            UnitButton = <div className="togglebttn-expand">
                            <ThreeDotsExapnded />
                        </div>
        }

        
        if(NewEventActive){
            return(
                <div className="gridHeader">
                    <button className="add-bttn" onClick={newEventToggle} style={{font:"Lato", fontSize:"1rem", verticalAlign:"center"}}>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"
                        style={{marginRight:"12px"}}
                        >
                            <path d="M9 16.875C6.91142 16.875 4.90838 16.0453 3.43153 14.5685C1.95468 13.0916 1.125 11.0886 1.125 9C1.125 6.91142 1.95468 4.90838 3.43153 3.43153C4.90838 1.95468 6.91142 1.125 9 1.125C11.0886 1.125 13.0916 1.95468 14.5685 3.43153C16.0453 4.90838 16.875 6.91142 16.875 9C16.875 11.0886 16.0453 13.0916 14.5685 14.5685C13.0916 16.0453 11.0886 16.875 9 16.875ZM9 18C11.3869 18 13.6761 17.0518 15.364 15.364C17.0518 13.6761 18 11.3869 18 9C18 6.61305 17.0518 4.32387 15.364 2.63604C13.6761 0.948212 11.3869 0 9 0C6.61305 0 4.32387 0.948212 2.63604 2.63604C0.948212 4.32387 0 6.61305 0 9C0 11.3869 0.948212 13.6761 2.63604 15.364C4.32387 17.0518 6.61305 18 9 18Z" fill="#696969"/>
                            <path d="M9 4.5C9.14918 4.5 9.29226 4.55926 9.39775 4.66475C9.50324 4.77024 9.5625 4.91332 9.5625 5.0625V8.4375H12.9375C13.0867 8.4375 13.2298 8.49676 13.3352 8.60225C13.4407 8.70774 13.5 8.85082 13.5 9C13.5 9.14918 13.4407 9.29226 13.3352 9.39775C13.2298 9.50324 13.0867 9.5625 12.9375 9.5625H9.5625V12.9375C9.5625 13.0867 9.50324 13.2298 9.39775 13.3352C9.29226 13.4407 9.14918 13.5 9 13.5C8.85082 13.5 8.70774 13.4407 8.60225 13.3352C8.49676 13.2298 8.4375 13.0867 8.4375 12.9375V9.5625H5.0625C4.91332 9.5625 4.77024 9.50324 4.66475 9.39775C4.55926 9.29226 4.5 9.14918 4.5 9C4.5 8.85082 4.55926 8.70774 4.66475 8.60225C4.77024 8.49676 4.91332 8.4375 5.0625 8.4375H8.4375V5.0625C8.4375 4.91332 8.49676 4.77024 8.60225 4.66475C8.70774 4.55926 8.85082 4.5 9 4.5Z" fill="#696969"/>
                        </svg>
                        New Event 
                    </button>
                </div>  
            )
        } else{
            if(EditMode){
                return(
                    <div className="gridHeader-editMode">
                        <input type="text" value={UnitObject.Name} onChange={NameOnChange} style={{marginRight:"20px"}}></input>
                        <input type="text" value={UnitObject.Time} onChange={TimeOnChange} style={{marginLeft:"0px",marginRight:"30px"}} ></input>
                        <input type="text" value={UnitObject.Location} onChange={LocationOnChange} style={{marginLeft:"0px",marginRight:"30px"}}></input>
                        <input type="text" value={UnitObject.Description} onChange={DescriptionOnChange} style={{marginLeft:"0px",marginRight:"30px"}}></input>
                        <input type="text" value={UnitObject.Attendees} onChange={AttendeesOnChange} style={{marginLeft:"0px",marginRight:"30px"}}></input>
                        {UnitButton}
                        <div className={"PopUpBttns"} ref={MenuForEdit}>
                            <button onClick={submitToggle} className="PopUpBttn-row" disabled={UnitObject.Name.length==0} style={{cursor:UnitObject.Name.length==0?"default":"pointer"}}>
                                <SaveCheckMark color={UnitObject.Name.length==0?"#848484":"#2B46CF"}/>
                                <p style={{color:UnitObject.Name.length==0?"#848484":"#2B46CF"}}>Save</p>
                            </button>
                            <button onClick={removeToggle} className="PopUpBttn-row">
                                <Remove />
                                <p>Remove</p>
                            </button>
                        </div>
                    </div>
                )
            } else{
                return(
                    <div className="gridHeader">
                        <p style={{paddingRight:"20px"}}>{UnitObject.Name}</p>
                        <p style={{paddingRight:"30px"}}>{UnitObject.Time}</p>
                        <p>{UnitObject.Location}</p>
                        <p>{UnitObject.Description}</p>
                        <p>{UnitObject.Attendees}</p>
                        {UnitButton}
                        <div className={"PopUpBttns"} ref={MenuForEdit}>
                            <button onClick={EditModeToggle} className="PopUpBttn-row">
                                <Edit />
                                <p style={{color:"#2B46CF", marginLeft:"5px"}}>Edit</p>
                            </button>
                            <button onClick={removeToggle} className="PopUpBttn-row">
                                <Remove />
                                <p style={{marginLeft:"5px"}}>Remove</p>
                            </button>
                        </div>
                    </div>
                )
            }
            
        }
    }

export default RowUnit

