const express = require('express');
const { decrypt } = require('./crypto');
const app = express();

app.get('/', (req, res) => {

    const codes = JSON.parse(require('fs').readFileSync('codes.json'));
    const names = JSON.parse(require('fs').readFileSync('names.json'));

    const decryptedNames = JSON.parse(decrypt(names));
    
    const queryCode = req.query.code;

    const queryGifter = codes.find(({ code }) => code === queryCode).name;
    const queryReceiver = decryptedNames.find(({ gifter }) => gifter === queryGifter).receiver;

    res.send(`${queryGifter} should give a gift to ${queryReceiver}`);
    
});

app.listen(3200, () => {
    console.log('App listening on port 3000!');
});
