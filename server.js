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

// route to home page html 
app.get('/', (req, res) => {
    res.sendFile(path.resolve("./public/index.html"))
})

//route to single restaurant page
app.get('/oneRestPage/:restId', (req, res) => {
    let restId = req.params.restId
   
    res.sendFile(path.resolve('./public/oneRestPage.html'))

})

// get index list of retaurant IDs
app.get('/restaurants', (req, res) => {
    res.sendFile(path.resolve("api/restaurants.json"))
})

//get a specific restaurant json
app.get('/restaurants/:name', (req, res) => {
    let name = req.params.name
    res.sendFile(path.resolve(`api/${name}.json`))
})

// start server
app.listen(port, () => {
    console.log('Server running on port ' + port)
})

