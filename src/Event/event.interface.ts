export enum EStatus {
    Draft  = "draft",
    Public   = "public",
    Private  = "private"
}

export interface IEvent{
    headline: string,
    description: string,
    startDate: Date,
    location: string,
    state: EStatus,
    subscribers: string[]
}
