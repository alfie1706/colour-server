# Colour-Server

This is a simple node.js app for displaying a solid colour on a webpage, and allowing updates via a REST API.

## Pre-Requisites
* [Node.js](https://nodejs.org/en)
* Port 13737 not already in use.

## Installation
* Download and unzip "colour-server" to a desired directory. 
* Open CLI with elevated privileges to the directory and execute `npm ci` to install relevant dependencies.
* Either...
    * Execute `npm start` to start the server in application mode (useful for troubleshooting).
    * Execute `node serice-install.js` to install as Windows service. Suggested for deployment

To verify that the app is running, navigate to your local IP on port 13737, and you should see a white background.


## Endpoints
### `[GET/POST]` /colour
This endpoint will either set or return the currently selected colour.

### Json Example

```json
{
    "red": 255,
    "green": 255,
    "blue": 255,
    "alpha": 255
}
```
