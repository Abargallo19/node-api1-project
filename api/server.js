// BUILD YOUR SERVER HERE
const express = require('express');
const Users = require('./users/model');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('Tester!!!');

});

server.get('/api/users', (req, res) => {
    Users.find()
    .then(result => {
        res.json(result)
    })
    .catch(() => {
        res.status(500).json({ message: "The users information could not be retrieved" })
    })
})


module.exports = server; // EXPORT YOUR SERVER instead of {}
