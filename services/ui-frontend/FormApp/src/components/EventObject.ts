export interface EventData {
    Name: string,
    key: string,
    isNew: boolean,
    Time: string,
    Location: string,
    Description: string,
    Contact: string,
    Attendees: string,
}

export interface FetchedPayload {
    Name: string,
    BegDate: Date,
    EndDate: Date,
}

export interface ParentState {
    loading: Boolean,
    error: string,
    payload?: FetchedPayload
}
export interface OriginalState{
    Title: string,
    BegDate: Date,
    data: Map<string, EventData>
}
export interface ReducerAction {
    __typename:'title'
    type: string,
    payload: string
}
interface DataPayload{
    id: string,
    mapObj?:EventData
}
export interface DataAction {
    __typename:'event'
    type: string,
    payload: DataPayload
}

export type DataUpdate = ReducerAction | DataAction
export const EmptyMap = new Map<string, EventData>()


