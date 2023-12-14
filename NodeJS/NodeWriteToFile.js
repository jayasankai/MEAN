const fs = require('fs');

const textData = 'This is the first NodeJS file!';

fs.writeFile('./data/user-data.txt', textData, err => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('done')
});