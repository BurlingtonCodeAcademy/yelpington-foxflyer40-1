// set up express
const { request } = require('express')
const express = require('express')
const app = express()
// set up port options
const port = process.env.PORT || 8080
// create absolute paths
const path = require('path')
// static middleware for routing
app.use(express.static('.'))


// home route
app.get('/', (req, res) => {
    res.send(`Yelpington!`)
})






app.listen(port, () => {
    console.log('Server running on port ' + port)
})
