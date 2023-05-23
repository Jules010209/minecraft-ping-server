# **Minecraft Ping Server**

> Who is that's?
- Allows you to ping the server with its IP address and obtain information about it.

> How to install?
```npm
npm install minecraft-ping-server
```

Example (Javascript):
```js
const { getStatus } = require('minecraft-ping-server/lib');

(async () => {
    await getStatus('play.minecraftkingdoms.com', 25565)
        .then(data => console.log(data))
        .catch(err => console.log(err));
})();
```
Output:
```text
{
  online: true,
  version: 'Velocity 1.7.2-1.19.4',
  motd: ' �b�m---------�8�l[-  �f�lCOMPLEX  �b�lGAMING  �8�l-]�b�l�m--------�r',
  onlinePlayers: '1165',
  maxPlayers: '1166'
}
```