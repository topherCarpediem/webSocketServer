const url = require('url');

module.exports = (request) => {

    return new Promise((resolve, reject) => {
        const location = url.parse(request.url, true)
        if (request.headers['user-agent']) {
            if (!location.query['serialnumber']) {
                reject("No serialnumber provided")
            }
            else if (!location.query['token']) {
                reject("No token provided")
            }
            resolve({
                serialnumer: location.query['serialnumber'],
                token: location.query['token']
            });
        } else {
            if (!request.headers.serialnumber) {
                reject("No user-agent found in the request, serialnumber must provide in the header section of the request")
            } else if (!request.headers.token) {
                reject("No user-agent found in the request, token must provide in the header section of the request")
            }
            resolve({
                serialnumer: request.headers.serialnumber,
                token: request.headers.token
            });
        }
    })
}