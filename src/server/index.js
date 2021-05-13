const express = require('express')
const dotenv = require("dotenv")
const cors = require('cors')
const { URLSearchParams } = require('url');
const fetch = require('node-fetch')

dotenv.config();

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

app.get('/', function(req, res) {
    res.sendFile('dist/index.html')
})

app.listen(8081, function () {
    console.log('Example app listening on port 8081! please visit http://localhost:8081')
})

app.post('/test', function(req, res) {
    const params = new URLSearchParams();
    params.append('key', process.env.API_KEY)
    params.append('lang', 'auto')
    if(req.body.input !== "") params.append('txt', req.body.input)
    else params.append('url', req.body.url)
    fetch('https://api.meaningcloud.com/sentiment-2.1', { method: 'POST', body: params })
    .then(response => {
        if(response.status == 200) { return response.json()}
        else { res.status(500).send({ status: { code: "100", msg: "internal server error" } }) }
    })
    .then(json => res.json(json))
})