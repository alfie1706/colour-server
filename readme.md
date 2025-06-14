# Colour-Server

This is a simple node.js app for displaying a solid colour on a webpage, and allowing updates via a REST API.

***This app will not run at startup by default, this should be done with Task Scheduler or similar.***

## Pre-Requisites
* [Node.js](https://nodejs.org/en)
* Port 13737 not already in use.

## Installation
* Download and unzip "colour-server" to a desired directory. 
* Open CLI to the directory and execute `npm ci` to install relevant dependencies.
* Run `npm start` to start the application.

To verify app running, navigate to your local IP on port 13737, and you should see a white background.


## Endpoints
### `[GET/POST]` /color
This endpoint will either set or return the currently selected colour.

### Json Example

```json
{
    "red": 255,
    "green" 255,
    "blue" 255,
    "alpha" 255
}
```
