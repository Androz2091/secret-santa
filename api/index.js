const express = require('express');
const { decrypt } = require('./crypto');
const app = express();

const cors = require('cors');
app.use(cors());

app.get('/', (req, res) => {

    const codes = JSON.parse(require('fs').readFileSync('codes.json'));
    const names = JSON.parse(require('fs').readFileSync('names.json'));

    const decryptedNames = JSON.parse(decrypt(names));
    
    const queryCode = req.query.code;

    if (!queryCode) {
        return res.send({
            error: 'Aucun code précisé!'
        });
    }

    try {
        const queryGifter = codes.find(({ code }) => code === queryCode).name;
        const queryReceiver = decryptedNames.find(({ gifter }) => gifter === queryGifter).receiver;

        res.send({
            gifter: queryGifter,
            receiver: queryReceiver
        });
    } catch (e) {
        res.send({
            error: 'Votre code est invalide!'
        });
    }
    
});

app.listen(3200, () => {
    console.log('App listening on port 3000!');
});
