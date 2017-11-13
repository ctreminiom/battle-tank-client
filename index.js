'use strict'

const express = require('express')
const path = require('path')
const app = express()

app.use("/static",express.static('static/public'))




app.set('views', path.join(__dirname, 'app/views'))
app.set('view engine', 'pug')


app.get("/", (req, res) => 
{
    res.render(
        'index',
        {title: 'Hey Hey Hey', message: 'Yo Yo'}
    )
})







app.listen(8080)