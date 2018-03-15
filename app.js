require('dotenv').config();
const http = require('http');
const url = require('url');
const socket = require('uws');
const express = require('express');

const app = express();
const server = http.createServer(app);

const client = require('./verifyClient');
const parseCredentials = require('./parseCredentials')

const wss = new socket.Server({
    server
    // verifyClient: (info, cb) => {

    //     parseCredentials(info.req)
    //         .then(credentials => {
    //             return credentials
    //         })
    //         .then(credentials => {
    //             client.isAuthenticated(credentials.token)
    //                 .then(authorized => {
    //                     if (authorized) {
    //                         cb(true);
    //                     } else {
    //                         cb(false, 401, "Unauthorized access");
    //                         //console.log(`Unauthorized access`)
    //                     }
    //                 }).catch(err => {
    //                     console.log(err);
    //                 });
    //         })
    //         .catch(err => {
    //             cb(false, 400, err)
    //         })
    // }
});


// On successful connection
wss.on('connection', ws => {
    if (ws.upgradeReq.headers.serialnumber) {
        ws.socket_id = ws.upgradeReq.headers.serialnumber;
    } else {
        ws.socket_id = url.parse(ws.upgradeReq.url, true).query['serialnumber'];
    }

    ws.isAlive = true;

    console.log(`The device ${ws.socket_id} is online`)
    console.log(wss.clients.length)
    ws.on('pong', heartbeat)

    ws.on('message', function (message) {
        ws.isAlive = true;
        onMessage(message, ws);
    });

    ws.send("Connected to live server");

    ws.on("close", function () {
        console.log(`The device ${ws.socket_id} is disconnected`)
        console.log(wss.clients.length)
    })


});

// Check if there is an error
wss.on("error", () => {
    console.log("An error occured")
})

// Listen on port
server.listen(process.env.PORT, () => {
    console.log(`Listening on port ${server.address().port}`)
});


// Set the connection to active
function heartbeat() {
    this.isAlive = true;
}

// Check if the connection is active
const interval = setInterval(function ping() {
    wss.clients.forEach(function each(ws) {
        if (ws.isAlive === false) return ws.terminate();
        ws.isAlive = false;
        ws.ping("ping");
    });
}, 30000);


// Sending messages
function onMessage(message, ws) {
    let testResult = checkSchema(message);

    if (testResult === true) {
        sendMessage(JSON.parse(message), ws)
    } else {
        ws.send(testResult, function ack(err) {
            if (err !== undefined) {
                console.log(err)
            }
        })
    }

}

function sendMessage(parsedMessage, ws) {
    console.log(`Sending message to ${parsedMessage.to} Message: ${parsedMessage.message}`)
    wss.clients.forEach(function each(client) {
        if (client.socket_id === parsedMessage.to) {
            
            if (client !== ws && client.readyState === socket.OPEN) {
                console.log(`Sending message to ${parsedMessage.to} Message: ${parsedMessage.message}`)
                client.send(JSON.stringify(parsedMessage.message), function ack(err) {
                    if (err !== undefined) {
                        console.log(err)
                    }
                })
            }
        }
    });
}

function checkSchema(message) {
    try {
        recipient = JSON.parse(message)
        if (!recipient.to) {
            return "Failed to send message, there is no recipient";
        } else if (!recipient.message) {
            return `Failed to send to ${recipient.to}, there is no message`;
        } else {
            return true;
        }
    }
    catch (err) {
        return "Format of the message is not valid, it must be a json string";
    }
}

//console.log(typeof wss.clients);

