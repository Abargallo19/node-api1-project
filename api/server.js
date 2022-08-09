// BUILD YOUR SERVER HERE
const express = require('express');
const Users = require('./users/model');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('Tester!!!');

});

//| GET    | /api/users/:id | Returns the user object with the specified `id`.  
//`findById` Takes an `id` 
//and resolves to the user with that id (or null if the id does not exist).

server.get(('/api/users/:id', (req, res) => {
    Users.findById(req.params.id)
        .then(result => {
            if(result == null) {
                res.status(404).json({ message: "The user with the specified ID does not exist" })
            } else {
                res.status(200).json(result)
            }
         })
         .catch(() => {
            res.status(500).json({ message: "The user information could not be retrieved" })
     });
}));


server.get('/api/users', (req, res) => {
    Users.find()
    .then(result => {
        res.json(result)
    })
    .catch(() => {
        res.status(500).json({ message: "The users information could not be retrieved" })
    });
})

server.post('/api/users', (req, res) => {
    Users.insert(req.body)
    .then(result => {
        if(result == null) {
            res.status(400).json({ message: "Please provide name and bio for the user" })
        } else {
            res.status(201).json(result);
        }
            
    })
    .catch(() => {
        res.status(500).json({message: "Please provide name and bio for the user" })
    });
})

server.delete(('/api/users/:id', (req, res) => {
    Users.remove(req.params.id)
        .then(result => {
            if(result == null) {
                res.status(404).json({message: "The user with the specified ID does not exist"})
            } else {
                res.json(result);
            }
        })
        .catch(()=> {
            res.status(500).json({message: "The user could not be removed"})
        });
}))

module.exports = server; // EXPORT YOUR SERVER instead of {}
