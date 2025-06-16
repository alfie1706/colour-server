const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

let currentColour = { red: 255, green: 255, blue: 255, alpha: 255 };

function log(p, s) {
    let dateNow = new Date()
    console.log(`[${dateNow}] [${p}] ${s}`)
}

function isValidColourValue(value) {
    return (typeof value === "number") && (value >= 0) && (value <= 255);
}

// POST Request to update the colour
app.post("/colour", (req, res) => {
    let { red, green, blue, alpha } = req.body;

    if (
        [red, green, blue, alpha].every(isValidColourValue)
    ) {
        alpha = alpha / 255 // alpha is 0-1 in html, but using 0-255 in the requests for consistency...
        currentColour = { red, green, blue, alpha };

        io.emit("updateColour", currentColour); // broadcast to all clients

        res.status(200).send({ status: "200", message: "Success", "currentColour": req.body });
        log("POST", `Received command. Setting current colour to ${currentColour.red} ${currentColour.green} ${currentColour.blue} ${currentColour.alpha}`);
    } else {
        res.status(400).send({ error: "Invalid RGBA values", "colourRequested": req.body, "currentColour": currentColour});
        log("POST", `Invalid RGBA value received, ${req.body.red} ${req.body.green} ${req.body.blue} ${req.body.alpha}`)
    }
});

// GET Request to get the current colour
app.get("/colour", (req, res) => {
    if(currentColour != null) {
        res.status(200).send({ status: "200", message: "Success", "currentColour": currentColour})
        log(`GET`, `Received command. Returning current colour value ${currentColour.red} ${currentColour.green} ${currentColour.blue} ${currentColour.alpha}`);
    } else {
        res.status(400).send({ status: "400", message: "Invalid RGBA value selected."});
    } 
});

// When a new client connects to the server
io.on("connection", (socket) => {
        socket.emit("updateColour", currentColour); // Send current colour
});


// start server
const PORT = process.env.PORT || 13737;

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
