//
const express = require("express")
const morgan = require("morgan")
const axios = require("axios")

const API_KEY = 'e8189a682df5cc53669dd9c70a982ba6'
const HASH = '90d93a07f76a027f7517eeb661715521'
// Creating our app
const app = express()

//Defining the web port
let port = process.env.PORT || 8080

//Middleware
app.use(express.json())
app.use(morgan('dev'))

//APIs
app.get('/', (req, res) => (
    res.send("<h1>Hello world<h1>")
))

app.get('/gatorade', (req, res) => (
    res.send("<h1>Hello from Gatorade<h1>")
))

app.post('/send-data', (req, res) => (
    console.log(req.body),
    res.send("Success")
))

//GETS
// Return the Name given by id
app.get('/marvel/character/:id', (req, res) => {

    const id = req.params.id

    const END_POINT = `http://gateway.marvel.com/v1/public/characters/${id}?ts=1000&apikey=${API_KEY}&hash=${HASH}`
    console.log("END_POINT: " + END_POINT)
    axios.get(END_POINT)
        .then(function(response) {
            console.log("RES: "+ response.data)
            res.json(
                {
                    name: response.data.data.results[0].name
                })
        })
        //Error handler
        .catch(function (error) {
            console.log("ERROR: " + error)
            res.send(error)
        })
})

// Return the Comic name 
app.get('/marvel/comics', (req, res) => {
    const END_POINT = `http://gateway.marvel.com/v1/public/comics?ts=1000&apikey=${API_KEY}&hash=${HASH}`
    console.log("END_POINT: " + END_POINT)
    axios.get(END_POINT)
        .then(function(response) {
            console.log("RES: "+ response.data)
            res.json(
                {
                    story: response.data.data.results[0].stories
                })
        })
        .catch(function (error) {
            console.log("ERROR: " + error)
            res.send(error)
        })
})

// Return the Event
app.get('/marvel/events', (req, res) => {
    const END_POINT = `http://gateway.marvel.com/v1/public/events?ts=1000&apikey=${API_KEY}&hash=${HASH}`
    console.log("END_POINT: " + END_POINT)
    axios.get(END_POINT)
        .then(function(response) {
            console.log("RES: "+ response.data)
            res.json(
                {
                    characters: response.data.data.results[0].characters
                })
        })
        .catch(function (error) {
            console.log("ERROR: " + error)
            res.send(error)
        })
})

// Return the Creator
app.get('/marvel/creators', (req, res) => {
    const END_POINT = `http://gateway.marvel.com/v1/public/creators?ts=1000&apikey=${API_KEY}&hash=${HASH}`
    console.log("END_POINT: " + END_POINT)
    axios.get(END_POINT)
        .then(function(response) {
            console.log("RES: "+ response.data)
            res.json(
                {
                    creator: response.data.data.results[5]
                })
        })
        .catch(function (error) {
            console.log("ERROR: " + error)
            res.send(error)
        })
})

// Return the Serie
app.get('/marvel/series', (req, res) => {
    const END_POINT = `http://gateway.marvel.com/v1/public/series?ts=1000&apikey=${API_KEY}&hash=${HASH}`
    console.log("END_POINT: " + END_POINT)
    axios.get(END_POINT)
        .then(function(response) {
            console.log("RES: "+ response.data)
            res.json(
                {
                    serie: response.data.data.results[0]
                })
        })
        .catch(function (error) {
            console.log("ERROR: " + error)
            res.send(error)
        })
})

// Return the Event in which comic appears given by id
app.get('/marvel/comics/events/:id', (req, res) => {

    const id = req.params.id

    const END_POINT = `http://gateway.marvel.com/v1/public/comics/${id}/events?ts=1000&apikey=${API_KEY}&hash=${HASH}`
    console.log("END_POINT: " + END_POINT)
    axios.get(END_POINT)
        .then(function(response) {
            console.log("RES: "+ response.data)
            res.json(
                {
                    name: response.data
                })
        })
        .catch(function (error) {
            console.log("ERROR: " + error)
            res.send(error)
        })
})


//POST
app.post("/Marvel/:id", (req, res)=> {

    //Validation
    console.log("Nombre: " + req.body.nombre)
    console.log("Apellido: " + req.body.apellido)

    if(!req.body.nombre) {
        res.status(400)
        res.send("Error, falta Nombre")
        return
    }

    if(!req.body.apellido) {
        res.status(400)
        res.send("Error, falta Apellido")
        return
    }
    
    //If all good...
    res.status(200)
    res.send("OK")
})

app.post("/Marvel_Comics", (req, res)=> {
    const id = req.params.id
    //Validation
    const END_POINT = `http://gateway.marvel.com/v1/public/comics/${id}?ts=1000&apikey=${API_KEY}&hash=${HASH}`
    console.log("END_POINT: " + END_POINT)
    axios.get(END_POINT)

        .then(function(response) {
            console.log("RES: "+ response.data)
            res.json(
                {
                    story: response.data.data.results[0].stories
                })
        })

        //ERROR HANDLER
        .catch(function (error) {
            console.log("ERROR: " + error)
            res.send(error)
            res.status(404)
        })
})

app.post("/Marvel_Events/:id", (req, res)=> {
    const id = req.params.id
    //Validation
    const END_POINT = `http://gateway.marvel.com/v1/public/events/${id}?ts=1000&apikey=${API_KEY}&hash=${HASH}`
    console.log("END_POINT: " + END_POINT)
    axios.get(END_POINT)
        .then(function(response) {
            console.log("RES: "+ response.data)
            res.json(
                {
                    characters: response.data.data.results[0].characters
                })
        })

        //ERROR HANDLER
        .catch(function (error) {
            console.log("ERROR: " + error)
            res.send(error)
            res.status(404)
        })
})

app.post("/Marvel_Creators/:id", (req, res)=> {
    const id = req.params.id
    const END_POINT = `http://gateway.marvel.com/v1/public/creators/${id}?ts=1000&apikey=${API_KEY}&hash=${HASH}`

    //Validation
    console.log("END_POINT: " + END_POINT)
    axios.get(END_POINT)
        .then(function(response) {
            console.log("RES: "+ response.data)
            res.json(
                {
                    creator: response.data.data.results[5]
                })
        })

        //ERROR HANDLER
        .catch(function (error) {
            console.log("ERROR: " + error)
            res.send(error)
        })
})

app.post("/Marvel_Series/:id", (req, res)=> {
    const id = req.params.id
    const END_POINT = `http://gateway.marvel.com/v1/public/series?ts=1000&apikey=${API_KEY}&hash=${HASH}`

    //Validation
    console.log("END_POINT: " + END_POINT)
    axios.get(END_POINT)
        .then(function(response) {
            console.log("RES: "+ response.data)
            res.json(
                {
                    serie: response.data.data.results[0]
                })
        })

        //ERROR HANDLER
        .catch(function (error) {
            console.log("ERROR: " + error)
            res.send(error)
        })
})

app.post("/Marvel_comics_events/:id", (req, res)=> {

    const id = req.params.id

    const END_POINT = `http://gateway.marvel.com/v1/public/comics/${id}/events?ts=1000&apikey=${API_KEY}&hash=${HASH}`
    console.log("END_POINT: " + END_POINT)
    axios.get(END_POINT)
        .then(function(response) {
            console.log("RES: "+ response.data)
            res.json(
                {
                    name: response.data
                })
        })

        //ERROR HANDLER
        .catch(function (error) {
            console.log("ERROR: " + error)
            res.send(error)
        })
})


//Server running
app.listen(port, () => {
    console.log("Server running on port "+ port);
})
