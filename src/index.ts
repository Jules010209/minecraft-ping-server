import net from 'net';

export const getStatus = async(address: string, port: number = 25565): Promise<{
    online: boolean,
    version?: string,
    motd?: string,
    onlinePlayers?: string,
    maxPlayers?: string
}> => {
    return new Promise((resolve, reject) => {
        const socket = net.connect(port, address, () => {
            let request_buffer = Buffer.from([0xFE, 0x01]);

            socket.write(request_buffer);
        });

        socket.setTimeout(2500, () => {
            socket.end();

            reject({
                code: 'ETIMEDOUT',
                errno: 'ETIMEDOUT',
                address,
                port
            });
        })

        socket.on('data', (data) => {
            if(data == null) return;

            let server = data.toString().split('\x00\x00\x00');

            if(server == null || server.length < 6) return resolve({ online: false });
            
            resolve({
                online: true,
                version: server[2].replace(/\u0000/g, ''),
                motd: server[3].replace(/\u0000/g, ''),
                onlinePlayers: server[4].replace(/\u0000/g, ''),
                maxPlayers: server[5].replace(/\u0000/g,'')
            });

            socket.end();
        });

        socket.on('error', (err) => {
            socket.destroy();

            reject(err);
        });
    });
}