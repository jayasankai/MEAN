const http = require('http');

const server = http.createServer((req, res) => {
    console.log('Incoming Request');
    console.log(req.method, req.url);

    let body = '';

    if (req.method === 'POST') {
        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {
            res.setHeader('Content-Type', 'text/html');
            const userName = body.split("=")[1];
            res.end('<h2> User Name : ' + userName + '</h2>');
        });
    } else {
        res.setHeader('Content-Type', 'text/html');
        res.end(
            `<form method='POST'>
                <input type='text' name='userName'>
                <button type='submit' >Create User</button>
            </form>`
        );
    }
});


server.listen(5500);