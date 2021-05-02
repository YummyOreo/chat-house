<h1 align="center">Breakfast (AKA Client)</h1>

---

## Structure

| Codebase/Folder               |                   Description                    |
| :--------------------- | :----------------------------------------------: |
| [src](src) | The react sorce code for reat (TS/React). |

## How to Run

** TO RUN YOU MAY HAVE TO DO THE FOLLOWING:**
- First go to `tsconfig.json` and remove `"noEmit": true`
- Run `$ tsc` in the console
- Run the dev server `$ npm start` 

### Make Oauth App
** You dont have to do this ijf you did it in the server side app**
First you need to make a github Oauth app [See here](https://docs.github.com/en/developers/apps/authorizing-oauth-apps)

These fields should be filled out like this:

![Example](https://cdn.discordapp.com/attachments/838071390175232050/838071399808630794/unknown.png)

### Fill in id
Go to ./Components/login/login.tsx and fill in the Client ID on line 14

Example:
```
ID=Your Client ID (Github)
```

### Install all node moduales (Only one time, do it when you pull too)

Type the following into the command line:
```console
$ npm i
``` 

### Run the client side dev server

Type the following into the command line:
```console
$ npm start
``` 

## About

This is the client folder for the chat app. It sends all requests to the server.

| Modules Used |
| :---------------------: |
| [Socket.io](#socketio) |
| [react](#react) |

### Socket.io 

> [https://socket.io/](https://socket.io/)

This is a module to send and receve request faster than HTTP requests

### React

> [https://expressjs.com/](https://reactjs.org/)

This helps make a website!
