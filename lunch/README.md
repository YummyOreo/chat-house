<h1 align="center">Lunch (AKA Server)</h1>

---

## Structure

| Codebase/Folder               |                   Description                    |
| :--------------------- | :----------------------------------------------: |
| [index](indtx.ts) | The main file for the server (TS). This is ran when you run the server |
| [utils](utils) | The main folder for the server, houses the utils or [users](https://github.com/OreoDivision/chat-house/blob/master/lunch/utils/users.ts) and [utils](https://github.com/OreoDivision/chat-house/blob/master/lunch/utils/utils.ts) files |
| [router](router) | The folder for the router/showing the server is runing | 

## How to Run

### Make Oauth App

First you need to make a github Oauth app [See here](https://docs.github.com/en/developers/apps/authorizing-oauth-apps)

These fields should be filled out like this:

![Example](https://cdn.discordapp.com/attachments/838071390175232050/838071399808630794/unknown.png)

### Fill in .env

Now rename the .env.example to .env and fill out the feelds

Example:
```
URL=Your Mongo DB URL
ID=Your Client ID (Github)
SECRET=Your Client SECRET (Github) 
```

### Install all node moduales (Only one time, do it when you pull too)

Type the following into the command line:
```console
$ yarn install
``` 

### Make js files

Type the following into the command line:
```console
$ yarn build
``` 

### Run the server

Type the following into the command line:
```console
$ yarn start
``` 

## About

This is the server folder for the chat app. It gest all requests from the client side.

| Modules Used |
| :---------------------: |
| [Socket.io](#socketio) |
| [express](#express) |
| http |

### Socket.io 

> [https://socket.io/](https://socket.io/)

This is a module to send and receve request faster than HTTP requests

### Express

> [https://expressjs.com/](https://expressjs.com/)

This module helps make a server on a port.
