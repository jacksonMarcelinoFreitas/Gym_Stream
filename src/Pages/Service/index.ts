import { BehaviorSubject, Observable, of } from "rxjs";
import { IMovementGymUser } from "../../Interfaces/IMovementGymUser";
import { api } from "../../Services/api";
import { IGym } from "../../Interfaces/IGym";
import { IGymOpeningClosingHours } from "../../Interfaces/IGymOpeningClosingHours";
import { IUser } from "../../Interfaces/IUser";

class HomeService {
    private movementGymUserListSubject = new BehaviorSubject<IMovementGymUser[]>([]);
    public movementGymUserList$ = this.movementGymUserListSubject.asObservable();
    private gymSubject = new BehaviorSubject<IGym | null>(null);
    public gym$ = this.gymSubject.asObservable();
    private zoneOffset = -(new Date().getTimezoneOffset()) / 60

    public async getMovementGymUser(customer: string | undefined): Promise<void> {
        try {
            this.getGym().subscribe(async gym => {
                const date = this.getUTCTimeRange(gym.openingHoursUTC, gym.closingHoursUTC);
                const response = await api.get(`/v1/movement-gym-user/${customer}?startTime=${date.startTime}&finishTime=${date.finishTime}`);
                const movementGymUserList: IMovementGymUser[] = response.data;

                movementGymUserList.map(movementGymUser => {
                    movementGymUser.entryDateTime = this.convertToLocalUTC(movementGymUser.entryDateTime)
                    if (movementGymUser.departureDateTime)  {
                        movementGymUser.departureDateTime = this.convertToLocalUTC(movementGymUser.departureDateTime)
                    }
                })

                this.movementGymUserListSubject.next(movementGymUserList);
                this.gymSubject.next(gym)
            })
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

    public async getTrainingTimeDay(user: IUser | null) {
        try {
            const response = await api.get(`/v1/movement-gym-user/training-time-day/${user?.userGymExternalId}?customerGym=${user?.customer}&zoneOffset=${this.zoneOffset}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    public async getWeeklyFrequency(user: IUser | null) {
        try {
            const response = await api.get(`/v1/movement-gym-user/weekly-frequency/${user?.userGymExternalId}?customerGym=${user?.customer}&zoneOffset=${this.zoneOffset}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    public async getNumberPeopleLast7days(user: IUser | undefined) {
        try {
            const response = await api.get(`/v1/movement-gym-user/number-people-last-7days/${user?.customer}?zoneOffset=${this.zoneOffset}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    public async getNumberPeopleByPeriodPreviousDay(user: IUser | null) {
        try {
            const response = await api.get(`/v1/movement-gym-user/number-people-by-period-previous-day/${user?.customer}?zoneOffset=${this.zoneOffset}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    public async getPeopleByPeriodByGenderLast7Days(user: IUser | null) {
        try {
            const response = await api.get(`/v1/movement-gym-user/people-by-period-by-gender-last-7days/${user?.customer}?zoneOffset=${this.zoneOffset}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    public setMovementGymUser(movementGymUserToUpdate: IMovementGymUser[]): void {
        let movementGymUserList: IMovementGymUser[] = []

        this.movementGymUserList$.subscribe(res => {
            movementGymUserList = res;
        });

        movementGymUserToUpdate.map(movementGymUser => {
            movementGymUser.entryDateTime = this.convertToLocalUTC(movementGymUser.entryDateTime)
            if (movementGymUser.departureDateTime)  {
                movementGymUser.departureDateTime = this.convertToLocalUTC(movementGymUser.departureDateTime)
            }
        })

        movementGymUserToUpdate.forEach(movementGymUser => {
            const index = movementGymUserList.findIndex(user => user.movementGymUserExternalId === movementGymUser.movementGymUserExternalId);
            (index !== -1) ? movementGymUserList[index] = movementGymUser : movementGymUserList.push(movementGymUser)
        })

        this.movementGymUserListSubject.next(movementGymUserList);
    };

    public getUTCTimeRange(openingHoursUTC: string, closingHoursUTC: string): IGymOpeningClosingHours {
        const [localStartHour, localStarMinute] = openingHoursUTC.split(':');
        const [localEndHour, localEndMinute] = closingHoursUTC.split(':');
        const localDateStartHour = new Date();
        const localDateEndHour = new Date();

        if(localStartHour >= localEndHour) {
            localDateEndHour.setDate(localDateEndHour.getDate() + 1)
        }

        const timezoneOffset = new Date().getTimezoneOffset() / 60;
        const startDateUTC = new Date(Date.UTC(localDateStartHour.getFullYear(), localDateStartHour.getMonth(), localDateStartHour.getDate(), parseInt(localStartHour) + timezoneOffset, parseInt(localStarMinute), 0));
        const endDateUTC = new Date(Date.UTC(localDateEndHour.getFullYear(), localDateEndHour.getMonth(), localDateEndHour.getDate(), parseInt(localEndHour) + timezoneOffset, parseInt(localEndMinute), 0));
        const startTime = startDateUTC.toISOString().slice(0, 19);
        const finishTime = endDateUTC.toISOString().slice(0, 19);

        return { startTime, finishTime };
    }

    private convertToLocalUTC(utcDateString: string): string {
        const utcDate = new Date(utcDateString);
        const localOffsetInMinutes = utcDate.getTimezoneOffset();
        const localOffsetInMs = localOffsetInMinutes * 60 * 1000;
        const localDate = new Date(utcDate.getTime() - localOffsetInMs);
        const year = localDate.getFullYear();
        const month = String(localDate.getMonth() + 1).padStart(2, '0');
        const day = String(localDate.getDate()).padStart(2, '0');
        const hours = String(localDate.getHours()).padStart(2, '0');
        const minutes = String(localDate.getMinutes()).padStart(2, '0');
        const seconds = String(localDate.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    }

    private getGym(): Observable<IGym> {
        return of({openingHoursUTC: '00:00', closingHoursUTC: '00:00' })
    }
}

export const homeService = new HomeService();