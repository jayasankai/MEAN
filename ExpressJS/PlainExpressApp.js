const express = require('express');

const app = express();

app.use((req, res, next) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk;
    });

    req.on('end', () => {
        const userName = body.split('=')[1];

        if (userName) {
            req.body = { name : userName };
        }

        next();
    });
});

app.use((req, res, next) => {
    if (req.body) {
      return res.send('<h2>User:' + req.body.name + '</h2>');  
    }

    res.send("<form method='POST'><input type='text' name='userName'/><button type='submit'>Add User</button></form>");

});

app.listen(5500);