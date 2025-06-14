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

// POST Request to update the colour
app.post("/colour", (req, res) => {
    let { red, green, blue, alpha } = req.body;

    if (
        typeof red === "number" &&
        typeof green === "number" &&
        typeof blue === "number" &&
        typeof alpha === "number"
    ) {
        if (alpha > 1) { alpha = alpha / 255}
        currentColour = { red, green, blue, alpha };
        io.emit("updateColour", currentColour); // broadcast to all clients
        res.status(200).send({ status: "200", message: "Success", "currentColour": req.body });
    } else {
        res.status(400).send({ error: "Invalid RGBA values" });
    }
});

// GET Request to get the current colour
app.get("/colour", (req, res) => {
    if(currentColour != null) {
        res.status(200).send({ status: "200", message: "Success", "currentColour": currentColour})
    } else {
        res.status(400).send({ status: "400", message: "Invalid RGBA value seelcted."});
    }
    
});

io.on("connection", (socket) => {
    // Send current colour on connection
    socket.emit("updateColour", currentColour);
});

const PORT = process.env.PORT || 13737;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
