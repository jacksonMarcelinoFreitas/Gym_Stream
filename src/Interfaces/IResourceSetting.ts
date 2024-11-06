export interface IResourceSetting {
    resourceSettingExternalId?: string,
    name?: string,
    accept?: boolean
}

export interface IResourceSettingNotification {
    startTimeUTC: string,
    endTimeUTC: string,
    numberPeople: number | null,
    userExternalId: string,
    customerGym: string
}