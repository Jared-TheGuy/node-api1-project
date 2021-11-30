// BUILD YOUR SERVER HERE

const express = require('express');
const Users = require(`./users/model`)

const server = express();

server.use(express.json())

//EndPoints

// server.get('/api/test', (req, res) => {
//     res.json({boong: 'bong'})
// })

// Get all users endpoint

server.get('/api/users', async (req, res) => {
    try {
        const users = await Users.find()
        res.json(users)
    }
    catch (err) {
        res.status(500).json({
            message: "something bad happened",
            error: err.message
        })
    }
})

server.get('/api/users/:id', async (req, res) => {
    const { id } = req.params
    try {
        const user = await Users.findById(id)
        if (!user) {
            res.status(404).json({
                message: `${id} is not a valid user`
            })
        }
        else {
            res.json({user})
        }
    }
    catch (err) {
        res.status(500).json({
            message: "something bad happened",
            error: err.message
        })
    }
})

server.post('/api/users', async (req, res) => {
    try {
        if (!req.body.name || !req.body.bio) {
            res.status(400).json({
                message: 'name and bio are required'
            })
        }
        else {
            const newUser = await Users.insert(req.body)
            res.status(201).json(newUser)
        }
    }
    catch (err) {
        res.status(500).json({
            message: "something bad happened",
            error: err.message
        })
    }
})

server.put('/api/users/:id', async (req, res) => {
    const { id } = req.params
    const { body } = req

    try {
        const updated = await Users.update(id,body)
        if (!updated) {
            res.status(400).json({
                message: `${id} is not a valid user`
            })
        }
        else {
            res.json(updated)
        }
    }
    catch (err) {
        res.status(500).json({
            message: "something bad happened",
            error: err.message
        })
    }
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
