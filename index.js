const express = require('express')

const server = express()

server.use(express.json())
let users = [
    {
        id: 1,
        name: "Jenny",
        bio: "from the block"
    },
    {
        id: 2,
        name: "50 Cent",
        bio: "Hit 9 times but dont walk with a limp"
    }
]

server.get('/', (req, res) => {
    res.status(200).json({message: "api running"})
})

server.get('/api/users', (req, res) => {
    res.status(200).json({data: users})
})

server.post('/api/users', (req, res) => {
    const user = req.body
    users.push(user)
    res.status(200).json({data: users})
})

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id

    users = users.filter(hub => hub.id !== id)

    res.status(204).end()
})

server.put('/api/users/:id', (req, res) => {
    
    const changes = req.body
    const id = Number(req.params.id)

    let found = users.find(u => u.id === id)

    if(found){
        Object.assign(found, changes)

        res.status(200).json(found)
    } else {
        res.status(404).json({ message: 'not found'})
    }
})

const port = 8888
server.listen(port, () => console.log('server running'))