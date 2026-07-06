export interface Player {
    steamId: string;
    name: string;
    fame: number;
    money: number;
    location: string;
}

export interface ServerStatus {
    online: boolean;
    players: number;
    maxPlayers: number;
    ping: number;
    version: string;
}