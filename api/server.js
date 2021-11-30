// BUILD YOUR SERVER HERE

const express = require('express');
const Users = require(`./users/model`)

const server = express();

server.use(express.json())

//EndPoints

server.get('/api/test', (req, res) => {
    res.json({boong: 'bong'})
})

// Get all users endpoint

// server.get('/api/users', (req, res) => {
//     try {
//         const users = await Users.find()
//     }
//     catch (err) {
//         res.status(500).json({
//             message: "something bad happened",
//             error: err.message
//         })
//     }
// })

module.exports = server; // EXPORT YOUR SERVER instead of {}
