export declare const getStatus: (address: string, port?: number) => Promise<{
    online: boolean;
    version?: string;
    motd?: string;
    onlinePlayers?: string;
    maxPlayers?: string;
}>;
