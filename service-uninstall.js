var Service = require('node-windows').Service;
var svc = new Service({
    name: 'Colour Server',
    description: 'Simple node.js application for controlling the colour of a webpage via REST api',
    script: './server.js'
});

svc.on('uninstall', function(){
    console.log("Uninstall Complete");
})

svc.uninstall();