export interface IMovementGymUser {
    movementGymUserExternalId: string,
    entryDateTime: string,
    departureDateTime: string,
    isDepartureDate: boolean,
    schedulingDepartureDateTime?: {
        departureDateTime: string
    }
}