export interface DataEntry{
    Title: string,
    Date: string,
    LastAccess: string,
    NumberOfEntries: number,
    Meta: Event_meta
}

export interface Event_meta{
    Created: string,
    NumberOfEntries: number,
    Modified: string
}

export interface EventTrack{
    EventUnit: DataEntry
}

const Entry1Meta: Event_meta = {
    Created: "Jul. 10, 2021, 7:43 PM",
    NumberOfEntries: 2,
    Modified: "Dec. 11, 2021, 11:20 AM"
}

const Entry2Meta: Event_meta = {
    Created: "Jul. 12, 2021, 4:40 PM",
    NumberOfEntries: 2,
    Modified: "Dec. 2, 2021, 11:20 AM"
}
const Entry3Meta: Event_meta = {
    Created: "Oct. 15, 2021, 4:40 PM",
    NumberOfEntries: 8,
    Modified: "Nov. 4, 2021, 11:00 AM"
}
const Entry4Meta: Event_meta = {
    Created: "Aug. 30, 2021, 5:20 PM",
    NumberOfEntries: 12,
    Modified: "Sept. 9, 2021, 8:43 AM"
}

export const Entry1: DataEntry = {
    Title: "Park Hangout with Coworkers, please meet at San Jose Downtown for drinks! If you need help, txet me at 4081292993,Park Hangout with Coworkers, please meet at San Jose Downtown for drinks! If you need help, txet me at 4081292993,",
    Date: "07/20/21",
    LastAccess: "07/15/21",
    NumberOfEntries: 3,
    Meta: Entry1Meta
}

export const Entry2: DataEntry = {
    Title: "Family Meetup",
    Date: "07/18/21",
    LastAccess: "07/17/21",
    NumberOfEntries: 5,
    Meta: Entry2Meta
}

export const Entry3: DataEntry = {
    Title: "National Park Adventure in WY and Utah!",
    Date: "07/23/21",
    LastAccess: "07/19/21",
    NumberOfEntries: 3,
    Meta: Entry3Meta
}

export const Entry4: DataEntry = {
    Title: "Flight to Colorado and Wyoming, Denver trip and hiking",
    Date: "08/23/21",
    LastAccess: "07/20/21",
    NumberOfEntries: 12,
    Meta: Entry4Meta
}

export interface InfoMeta {
    Title: string,
    Meta: Event_meta
}



export const Entries: Array<DataEntry> = [Entry1, Entry2, Entry3, Entry4]
export const modEntries: Array<DataEntry> = [Entry4, Entry3]