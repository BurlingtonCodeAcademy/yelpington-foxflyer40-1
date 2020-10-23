// set up express
const { request } = require('express')
const express = require('express')
const app = express()

// set up port options
const port = process.env.PORT || 8080

// create absolute paths
const path = require('path')

// static middleware for routing
app.use(express.static('public'))


// home route
app.get('/', (req, res) => {
       res.sendFile(path.resolve("public/index.html"))
})

app.get('/restaurants', (req, res) => {
    res.sendFile(path.resolve("api/restaurants.json"))
    
})

app.get('/restaurants/:name', (req, res) => {
    let name = req.params.name
    res.sendFile(path.resolve(`api/${name}.json`))
})


app.listen(port, () => {
    console.log('Server running on port ' + port)
})
