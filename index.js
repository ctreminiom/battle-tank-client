'use strict'

const express = require('express')
const path = require('path')
const body = require('body-parser')

const request = require("request")

const app = express()

app.use(body.urlencoded({ extended: false}))
app.use(body.json())

const port = process.env.PORT || 9000

app.use("/static",express.static('static'))
app.disable('etag');


app.set('views', path.join(__dirname, 'app/views'))
app.set('view engine', 'pug')

app.get("/tanques", (req, res) => 
{
    res.render(
        'index'
    )
})


app.post("/init", (req, res) =>
{

    console.log(req.body)

    var options = {
        url: 'http://localhost:5000/api/v1.0/game/init/',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        json: req.body
      }

      request(options, function(err, responde, body){
        if (responde && (responde.statusCode === 200 || responde.statusCode === 201))
        {
           // console.log(responde.server_)
            res.send({message: body})
        }
      })

})

app.post("/movement", (req, res) =>
{

    console.log(req.body)

    //res.body = uuid, player_uuid, x, y.


    //res.send() = direccion, # de pixeles dependiendo de la direccion.


    res.send({direccion: "up", pixels: "300"})
})
















app.put("/update/life", (req, response) =>
{

    console.log(req.body)

    var options = {
        url: 'http://localhost:5000/api/v1.0/game/put/life/',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        json: req.body
      }

      request(options, function(err, res, body){
        if (res && (res.statusCode === 200 || res.statusCode === 201))
        {
            response.send({life: res.body.life})
        }
      })

})


app.listen(port, () =>{
    console.log(`SERVIDOR WEB CORRIENDO EN EL PUERTO 9000`)
    
})
