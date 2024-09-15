import { Client } from '@stomp/stompjs';
import { IMovementGymUser } from '../Interfaces/IMovementGymUser';
import { homeService } from '../Pages/Service';

class WebSocketService {
    private client: Client;
    private isReconnection: boolean = false;

    constructor() {
        this.client = new Client({
            brokerURL: 'ws://localhost:8080/gs-guide-websocket',
            debug: (str) => {
                console.log(str);
            },
            reconnectDelay: 5000, // Tenta reconectar a cada 5 segundos se a conexão for perdida
            onConnect: () => {
                console.log('Connected');

                if (this.isReconnection) {
                    homeService.getMovementGymUser()
                    this.isReconnection = false
                }

                // Inscreve-se no tópico e define o que fazer ao receber mensagens
                this.client.subscribe('/topic/output-channel-gym-test', (data) => {
                    // console.log(`Received: ${data.body}`);
                    const res: IMovementGymUser[] = JSON.parse(data.body);

                    homeService.setMovementGymUser(res);
                });
            },
            onStompError: (frame) => {
                console.error(`Broker reported error: ${frame.headers['data']}`);
                console.error(`Additional details: ${frame.body}`);
            },
        });

        this.client.onWebSocketClose = () => {
            this.isReconnection = true
            console.log('WebSocket connection was lost');
        };          
    }

    // Método para ativar o WebSocket
    public activate(): void {
        this.client.activate();
    }

    // Método para desativar o WebSocket
    public deactivate() {
        this.client.deactivate();
    }
}

export const webSocketService = new WebSocketService();