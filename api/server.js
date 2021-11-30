// BUILD YOUR SERVER HERE

const express = require('express');
const Users = require(`./users/model`)

const server = express();

server.use(express.json())

//EndPoints

server.get('/api/users', async (req, res) => {
    try {
        const users = await Users.find()
        res.json(users)
    }
    catch (err) {
        res.status(500).json({ message: "The users information could not be retrieved" })
    }
})

server.get('/api/users/:id', async (req, res) => {
    const { id } = req.params
    try {
        const user = await Users.findById(id)
        if (!user) {
            res.status(404).json({ message: "The user with the specified ID does not exist" })
        }
        else {
            res.json(user)
        }
    }
    catch (err) {
        res.status(500).json({ message: "The user information could not be retrieved" })
    }
})

server.post('/api/users', async (req, res) => {
    try {
        if (!req.body.name || !req.body.bio) {
            res.status(400).json({ message: "Please provide name and bio for the user" })
        }
        else {
            const newUser = await Users.insert(req.body)
            res.status(201).json(newUser)
        }
    }
    catch (err) {
        res.status(500).json({ message: "There was an error while saving the user to the database" })
    }
})

server.put('/api/users/:id', async (req, res) => {
    const { id } = req.params
    const { body } = req

    try {
        const updated = await Users.update(id,body)
        if (!updated) {
            res.status(404).json({ message: "The user with the specified ID does not exist" })
        }
        else {
            if (!body.name || !body.bio) {
                res.status(400).json({ message: "Please provide name and bio for the user" })
            }
            else {
            res.json(updated)
            }
        }
    }
    catch (err) {
        res.status(500).json({ message: "The user information could not be modified" })
    }
})

server.delete('/api/users/:id', async(req, res) => {
    const { id } = req.params
    try {
        const updated = await Users.remove(id)
        if (!updated) {
            res.status(404).json({ message: "The user with the specified ID does not exist" })
        }
        else {
            res.json(updated)
        }
    }
    catch (err) {
        res.status(500).json({ message: "The user could not be removed" })
    }
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
