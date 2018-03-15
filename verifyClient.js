const fetch = require("node-fetch");


module.exports = {
    isAuthenticated: (token) => {

        return fetch(process.env.VALIDATE_TOKEN_URL, { 
            method: 'POST',
            body: JSON.stringify({ GuidToken: token }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(status => {
            if(status == 1)
            {
                return true;
            }else {
                return false;
            }
        }).catch(err => {
            console.log(err.message)
        });
    }
}




