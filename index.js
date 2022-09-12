const express = require('express')
const mongoose = require('mongoose')


const mongodbPassword = 'CpxSuRojHmgseJmH'
const mongodbConnection = `mongodb+srv://wbs009:${mongodbPassword}@cluster0.zxpk1sy.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(mongodbConnection)

const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection failed'))

const app = express()
app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use(express.json())

const port = 8080

app.post('/student', (req, res) => {
    console.log(req.body)
    res.send({created: req.body})
})


app.listen(port, () => console.log('Server listening at ' + port))
