import { BehaviorSubject } from "rxjs";
import { IMovementGymUser } from "../../Interfaces/IMovementGymUser";
import { api } from "../../Services/api";
import { IGymOpeningClosingHours } from "../../Interfaces/IGymOpeningClosingHours";
import { IUser } from "../../Interfaces/IUser";
import { IGymOpeningHours, IGymOpeningHoursLocal } from "../../Interfaces/IGym";
import { IResourceSetting, IResourceSettingNotification } from "../../Interfaces/IResourceSetting";
import { INotification } from "../../Interfaces/INotification";

class HomeService {
    private movementGymUserListSubject = new BehaviorSubject<IMovementGymUser[]>([]);
    public movementGymUserList$ = this.movementGymUserListSubject.asObservable();
    private gymSubject = new BehaviorSubject<IGymOpeningHours | null>(null);
    public gym$ = this.gymSubject.asObservable();
    private zoneOffset = -(new Date().getTimezoneOffset()) / 60

    public async getMovementGymUser(user: IUser | null): Promise<void> {
        try {
            const gym = await this.getGymOpeningHours(user)
            const date = this.getTimeRange(gym.startOpeningHoursUTC, gym.endOpeningHoursUTC);
            const response = await api.get(`/v1/movement-gym-user/${user?.customer}?startTime=${date.startTime}&finishTime=${date.finishTime}`);
            const movementGymUserList: IMovementGymUser[] = response.data;

            movementGymUserList.map(movementGymUser => {
                movementGymUser.entryDateTime = this.convertToLocalUTC(movementGymUser.entryDateTime)
                if (movementGymUser.departureDateTime)  {
                    movementGymUser.departureDateTime = this.convertToLocalUTC(movementGymUser.departureDateTime)
                }
            })

            this.movementGymUserListSubject.next(movementGymUserList);
            this.gymSubject.next(gym)
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

    public async getPeopleByPeriodLast7Days(user: IUser | null) {
        try {
            const response = await api.get(`/v1/movement-gym-user/people-by-period-last-7days/${user?.customer}?zoneOffset=${this.zoneOffset}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    public async getPeopleByGenderLast7Days(user: IUser | null) {
        try {
            const response = await api.get(`/v1/movement-gym-user/people-by-gender-last-7days/${user?.customer}?zoneOffset=${this.zoneOffset}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    public async getGymOpeningHours(user: IUser | null) {
        try {
            const response = await api.get(`/v1/gym/opening-hours/${user?.customer}?zoneOffset=${this.zoneOffset}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    public async getChannel(user: IUser | null) {
        try {
            const response = await api.get(`/v1/channel/${user?.customer}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    public destroy() {
        this.movementGymUserListSubject.next([])
        this.gymSubject.next(null)
    }
    
    public async getUserResourceSetting(user: IUser | null) {
        try {
            const response = await api.get(`/v1/user/resource-setting/${user?.externalId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    public async setUserResourceSetting(user: IUser | null, resource: IResourceSetting[] ) {
        try {
            const response = await api.put(`/v1/user/user-resource-setting/${user?.externalId}`, resource);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    public async setUserNotification(resource: IResourceSettingNotification){
        const updateResource = {
            ...resource,
            startTimeUTC: this.getUTCHours(resource.startTimeUTC),
            endTimeUTC: this.getUTCHours(resource.endTimeUTC)
        }
        try {
            const response = await api.post(`/v1/notification`, updateResource);
            return { data: response.data, status: response.status }
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

    public async getUserNotification(user: IUser | null){
        try {
            const response = await api.get(`/v1/notification/${user?.externalId}`, { 
                params: { 
                    customerGym: user?.customer
                }
            });
            return { data: response.data, status: response.status }
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    public async deleteUserNotification(notification: INotification | null){
        try {
            const response = await api.delete(`/v1/notification/${notification?.notificationExternalId}`);
            return { data: response.data, status: response.status }
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }
    

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

    private getUTCHours(localTime: string): string {
        const [hours, minutes] = localTime.split(':').map(Number);

        if (isNaN(hours) || isNaN(minutes)) {
            throw new Error('Invalid time string');
        }

        const localDate = new Date();
        localDate.setHours(hours, minutes, 0, 0);

        const utcHours = String(localDate.getUTCHours()).padStart(2, '0');
        const utcMinutes = String(localDate.getUTCMinutes()).padStart(2, '0');

        return `${utcHours}:${utcMinutes}`
    }
    
    public getTimeRange(openingHoursUTC: string, closingHoursUTC: string): IGymOpeningClosingHours {
        const [localStartHour, localStarMinute] = openingHoursUTC.split(':');
        const [localEndHour, localEndMinute] = closingHoursUTC.split(':');
        const localDateStartHour = new Date();
        const localDateEndHour = new Date();

        if(localStartHour >= localEndHour) {
            localDateEndHour.setDate(localDateEndHour.getDate() + 1)
        }

        const startDateUTC = new Date(Date.UTC(localDateStartHour.getFullYear(), localDateStartHour.getMonth(), localDateStartHour.getDate(), parseInt(localStartHour), parseInt(localStarMinute), 0));
        const endDateUTC = new Date(Date.UTC(localDateEndHour.getFullYear(), localDateEndHour.getMonth(), localDateEndHour.getDate(), (parseInt(localEndHour)), parseInt(localEndMinute), 0));
        const startTime = startDateUTC.toISOString().slice(0, 19);
        const finishTime = endDateUTC.toISOString().slice(0, 19);

        return { startTime, finishTime };
    }

    public getTimeRangeLocal(openingHoursUTC: string, closingHoursUTC: string): IGymOpeningHoursLocal {
        const [localStartHour, localStarMinute] = openingHoursUTC.split(':');
        const [localEndHour, localEndMinute] = closingHoursUTC.split(':');
        const localDateStartHour = new Date();
        const localDateEndHour = new Date();

        const timezoneOffset = new Date().getTimezoneOffset() / 60;
        if(localStartHour >= localEndHour) {
            localDateEndHour.setDate(localDateEndHour.getDate() + 1)
        }

        const startDateUTC = new Date(Date.UTC(localDateStartHour.getFullYear(), localDateStartHour.getMonth(), localDateStartHour.getDate(), parseInt(localStartHour) - timezoneOffset, parseInt(localStarMinute), 0));
        const endDateUTC = new Date(Date.UTC(localDateEndHour.getFullYear(), localDateEndHour.getMonth(), localDateEndHour.getDate(), (parseInt(localEndHour)), parseInt(localEndMinute), 0));
        const startOpeningHours = startDateUTC.toISOString().split("T")[1].slice(0, 8);
        const endOpeningHours = endDateUTC.toISOString().split("T")[1].slice(0, 8);

        return { startOpeningHours, endOpeningHours };
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
}

export const homeService = new HomeService();