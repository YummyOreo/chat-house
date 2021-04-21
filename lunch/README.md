<h1 align="center">Lunch (AKA Server)</h1>

---

## Structure

| Codebase/Folder               |                   Description                    |
| :--------------------- | :----------------------------------------------: |
| [index](indtx.ts) | The main file for the server (TS). This is ran when you run the server |
| [utils](utils) | The main folder for the server, houses the utils or [users](https://github.com/OreoDivision/chat-house/blob/master/lunch/utils/users.ts) and [utils](https://github.com/OreoDivision/chat-house/blob/master/lunch/utils/utils.ts) files |
| [router](router) | The folder for the router/showing the server is runing | 

## About

This is the server folder for the chat app. It gest all requests from the client side.

| Modules Used |
| :---------------------: |
| [Socket.io](#socketio) |
| [express](express) |
| http |

### Socket.io 

> [https://socket.io/](https://socket.io/)
This is a module to send and receve request faster than HTTP requests

### Express

> [https://expressjs.com/](https://expressjs.com/)
This module helps make a server on a port.
