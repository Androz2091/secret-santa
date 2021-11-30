const { encrypt } = require('./crypto');

let names = [
    "Emmy",
    "Melia",
    "Mehdi",
    "Simon Barth",
    "Ulysse",
    "Hana",
    "Ethan",
    "Yann",
    "Quentin",
    "Django",
    "Arthur",
    "Louise Coquin",
    "Chiara",
    "Jeanne",
    "Anycia",
    "Dominique",
    "Morgane",
    "Taïbou",
    "Emma",
    "Adèle",
    "Nina",
    "Mohcene",
    "Sabrina",
    "Mathilde",
    "Jules",
    "Simon Lefort",
    "Janelle",
    "Titouan",
    "Louise Mabic",
    "Edouard",
    "Maylis",
    "Louise Simonet",
    "Clément",
    "Gabriel"
];


// shuffle the names array
names = names.sort(() => Math.random() - 0.5);

// basically, everyone shoukd give a gift to someone, but not to themselves and they should not give a gift to someone who have them a gift

const availableGifters = new Set(names);
const needingAGift = new Set(names);

const shouldGiveTo = new Map();
while (needingAGift.size > 0) {
    // find a random gifter
    const gifter = Array.from(availableGifters)[Math.floor(Math.random() * availableGifters.size)];
    // find a random receiver
    const receiver = Array.from(needingAGift)[Math.floor(Math.random() * needingAGift.size)];
    console.log(`${gifter} should give a gift to ${receiver}`);
    if (gifter !== receiver) {
        shouldGiveTo.set(gifter, receiver);
        needingAGift.delete(receiver);
        availableGifters.delete(gifter);
    }
}

require('fs').writeFileSync('./names.json', JSON.stringify(encrypt(JSON.stringify(Array.from(shouldGiveTo.entries()).map(([gifter, receiver]) => ({ gifter, receiver }))))));

const codes = new Map();
// assign a random 4char code to each name
names.forEach(name => {
    const code = Math.random().toString(36).substring(2, 6);
    codes.set(name, code);
});

require('fs').writeFileSync('./codes.json', JSON.stringify(Array.from(codes.entries()).map(([name, code]) => ({ name, code })), null, 4));

console.log(shouldGiveTo);
