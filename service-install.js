var Service = require('node-windows').Service;
var svc = new Service({
    name: 'Colour Server',
    description: 'Simple node.js application for controlling the colour of a webpage via REST api',
    script: './server.js'
});

svc.on('install', function(){
    svc.start();
    console.log("Install complete. You can safely close this terminal window")
})

svc.install();