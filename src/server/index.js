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
    params.append('url', req.body.url)
    fetch('https://api.meaningcloud.com/sentiment-2.1', { method: 'POST', body: params })
    .then(response => {
        if(!response.ok) { throw new FetchError(res.status, res.statusText, {response: res}) }
        return response.json()
    })
    .then(json => res.json(json))
    .catch(err => {
        res.json({ status: { code: "400", msg: "Internal server error" } })
    })
})