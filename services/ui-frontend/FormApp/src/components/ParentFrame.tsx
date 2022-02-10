import React, {lazy, Suspense, useReducer, createContext, useEffect} from "react"
import BreadCrumbs from "./bread-crumbs/BreadCrumbs"
import InputField from "./text-input/InputField"
import { useState } from "react"
import {ParentState, OriginalState, ReducerAction, DataAction, DataUpdate, EmptyMap} from "./EventObject"
import { BrowserRouter as Router, Route, Switch} from "react-router-dom"
const deepcopy = require('lodash.clonedeep')
import "./styles.css"

const initialState: OriginalState = {
    Title:"",
    BegDate: new Date(),
    data: EmptyMap
}

export const BreadCrumbsContext = createContext(undefined)
export const FormStateContext = createContext(undefined)

const reducer = (state: Number, action: Number) => {
    return action
}
const dataLoadReducer = (state: OriginalState , action: DataUpdate): OriginalState => {
    switch(action.type){
        case 'Title':
            if(action.__typename === 'title') return {...state, Title: action.payload}
        case 'Map':
            if(action.__typename === 'event'){
                const newMap = deepcopy(state.data)
                if(action.payload.mapObj){
                    newMap.set(action.payload.id, action.payload.mapObj)
                    return {...state, data: newMap}
                }
                else{
                    newMap.delete(action.payload.id)
                    return {...state, data: newMap}
                }
            }
        default:
            return state
    }
}

export default function ParentFrame(){
    const EventUnitWrap = lazy(() => import("./event-unit-creator/Event_unit_creator_wrapper"))
    const CalendarInputs = lazy(() => import("./text-input/CalendarInputs"))
    const DownloadFrame = lazy(() => import("./Pdfpage/DownloadFrame"))
    const [BreadCrumb, dispatch] = useReducer(reducer, 1)
    const [FormState, FormStateDispatch] = useReducer(dataLoadReducer, initialState)
    

    return(
        <div className="parent-frame">
            <div className="breadcrumb-wrapper">
                <BreadCrumbs page={BreadCrumb}/>
            </div>
            <FormStateContext.Provider value = {{FormState, FormStateDispatch}}>
                <BreadCrumbsContext.Provider value = {{BreadCrumb,dispatch}}>
                    <Router>
                        <Switch>
                            <Suspense fallback={<div>loading...</div>}>
                                    <Route exact path="/">
                                        <div className="form-page1-wrapper">
                                            <InputField 
                                                collectionName={FormState.Title}
                                            />
                                        </div>
                                    </Route>
                                    <Route exact path="/dates" 
                                        render={() => 
                                        <CalendarInputs begDate={FormState.BegDate} endDate={FormState.BegDate}/>}
                                    />
                                    <Route exact path="/studio" render={() => <EventUnitWrap />}/>
                                    <Route exact path="/download" render={() => <DownloadFrame />}/>
                            </Suspense>
                        </Switch>
                    </Router>
                </BreadCrumbsContext.Provider>
            </FormStateContext.Provider>
        </div>
    )
}
