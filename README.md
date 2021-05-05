<div align="center"><img src="https://static.thenounproject.com/png/2206184-200.png"></div>
<h1 align="center">About Chat House</h1>
<h3 align="center"><a href="#about">About</a> · <a href="#how-to-contribute">How to contribute</a> · <a href="#how-to-run-the-app">How to run</a> · <a href="https://trello.com/b/CCdaLcA9">Trello</a> · <a href="FAQ.md">FAQ</a></h3>

---

# ⚠️  DO NOT WORK ON ANYTHING TILL THE PR [#17](https://github.com/OreoDivision/chat-house/pull/17) IS MERGED ⚠️ 

## Structure

| Codebase               |                   Description                    |
| :--------------------- | :----------------------------------------------: |
| [Breakfast](breakfast) | The sorce code for the client side (TS/React) |
| [Lunch](lunch)         |      The sorce code for the server (TS)       |
| [Dinner](dinner)       |             The sorce code for the API (PY/Flask)             |
| [Brunch](#structure)   |              Coming Soon (Docs/md)               |

## Branches

Only Ones that **Wont** go away (Not temporary)

| Branch                                                     |           Description           |
| :--------------------------------------------------------- | :-----------------------------: |
| [master/main](https://github.com/OreoDivision/chat-house/) | The sorce code for the chat app |

## About

Chat House, is a app for creators. You can make different types of rooms for different purposes!

## Notable features:

- [ ] Make Rooms

- [x] Room Types

## How to contribute:

### Here is a list of things to do **before** helping:

- Look at [issuse](https://github.com/OreoDivision/chat-house/issues) to find a issue that you want to work on
  Or
- Find something to add to

#### Aslo make shoure what you want to work on is not in [Working On](WORKING_ON.md)

### Then contact **OreoDivision** on discord @ OreoDivision#0001

Go to discord and dm me something like this:

```
**I want to help with your chat app**
I want to <add/fix>
<Describe what you want to add>
```

### Fork and make what you want:

Make shoure you add comments and only change what you need to

### Make A PR and your done!

Open a pr with a description

## How to run the app

There are 2 things to run, with the same command.

### First download the files

```console
$ git clone https://github.com/OreoDivision/chat-house
$ cd chat-house
```

This will download the sorce for the chat app

### To run the api, [go here](https://github.com/OreoDivision/chat-house/blob/master/dinner/README.md)

### Install Node JS

To make the server and client work you need nodejs
Go [here https://nodejs.org/en/](https://nodejs.org/en/)

### Install all npm packages

In both [lunch](lunch) and [breakfast](breakfast) type the following in the console:

```console
$ npm i
```

### Convert TS to JS

In both [lunch](lunch) and [breakfast](breakfast) type the following in the console:

##### Note:

- You may need to remove `"noEmit": true` from `tsconfig.json` in the [breakfast](breakfast) ***Every time you make changes***

```console
$ tsc
```

### Run the app:

To run the app you need **2** consoles open in [lunch](lunch) and [breakfast](breakfast), then type:

```console
$ npm start
```

In each!
