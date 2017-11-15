'use strict'

const express = require('express')
const path = require('path')

const app = express()
const port = process.env.PORT || 9000

app.use("/static",express.static('static'))
app.disable('etag');


app.set('views', path.join(__dirname, 'app/views'))
app.set('view engine', 'pug')


app.get("/", (req, res) => 
{
    res.render(
        'index'
    )
})


app.listen(port, () => {
    console.log(`SERVIDOR WEB CORRIENDO EN EL PUERTO 9000`)
})
