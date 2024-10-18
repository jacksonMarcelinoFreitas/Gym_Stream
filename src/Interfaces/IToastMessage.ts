export interface IToastMessage {
    type?: 'success' | 'warn' | 'error' | 'info';
    message?: string;
}