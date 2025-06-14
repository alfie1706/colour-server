# Colour-Server Documentation

This is a simple node.js app for displaying a solid colour on a webpage, and allowing updates via a REST API.

## Pre-Requisites
* Node.js v8 or above.
* Port 26567 not already in use.

## Installation
Place the "colour-server" folder in a suitable directory and execute. `npm ci` to install relevant dependencies, and `npm start` to run the application.

This app will not run at startup by default, this should be done with Task Scheduler or similar.

## Endpoints
### `GET/POST` /color
This endpoint will either set or return the currently selected colour.

### Json Schema

```json
{
    "red": 255,
    "green" 255,
    "blue" 255,
    "alpha" 255
}
```
