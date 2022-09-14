const express = require('express')
const mongoose = require('mongoose')
const Student = require('./model/student')

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

function _makeApiStudent(dbStudent) {
    return {
        id: dbStudent._id,
        name: dbStudent.name,
        firstName: dbStudent.first_name,
        email: dbStudent.email
    }
}

app.post('/student', async (req, res) => {
    console.log(req.body)
    const newStudent = await Student.create({
        name: req.body.name,
        first_name: req.body.firstName,
        email: req.body.email
    })

    res.send(newStudent)

    console.log('Creation in')
})

app.get('/student', async (req, res) => {
    const studentsArray = await Student.find({})
        res.send(studentsArray.map((e) => _makeApiStudent(e)
    ))
})

app.get('/student/:id', async (req, res) => {
    const {id} = req.params
    const e = await Student.findById(id)
    res.send(_makeApiStudent(e))
})



app.listen(port, () => console.log('Server listening at ' + port))
