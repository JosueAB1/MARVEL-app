# Marvel API


>To do this API exercise, you need be registered on the Marvel API page, and on section of Developer Account you will get a Public and Private Key.
>
>* [Register on Marvel API](https://developer.marvel.com/)
>
>On its documentation says that you need a timestamp and a [**MD5 hash**](https://www.md5hashgenerator.com/), this folllows the next formula: 
>
>**_(timestamp + Public Key + Private Key)_**

>## Instalation
>** **
>
>You need:  
>* Node.js
>* Postman
>* API Keys and hash on Marvel API
>    1. About the code, you have to write on terminal the command:
>
>     npm install
>
>   2. After that, write:
>
>     node <fiile_name>

>## How it works?
>** **
>
>A REST API works as any website does. A call is made by the client, the data is received by the server and it send back the information to the client, it by the HTTP Protocol. Here we can find two methods: _GET_ and _POST_.
>
>### GET example

~~~  
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

~~~
>### POST example
>
~~~
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
~~~
>### Remember...
>** **
>* We are using the port 8080








