const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const fs = require('fs')

app.use(bodyParser.json())

const studentsFileName = "students.json"

var students = []
students = readFromJSONFile(studentsFileName)

app.get("/students", (req, res) => {
    students = readFromJSONFile(studentsFileName)
    res.json(students)
})

app.get("/students/:index", (req, res) => {
    students = readFromJSONFile(studentsFileName)
    var index = req.params.index
    if (students[index] !== undefined) {
        res.json(students[index])
    } else {
        res.status(404)
        res.json({ "message": "Not found" })
    }
})

app.get("/students/username/:username", (req, res) => {
    var student;
    username = req.params.username
    student = students.find(function (element) {
        return element["username"] === username
    })

    if (student !== undefined) {
        res.json(student)
    } else {
        res.status(404)
        res.json({ "message": "Not found" })
    }
})

app.post("/students", (req, res) => {
    students.push(req.body)
    saveInJSONFile(students, studentsFileName)
    res.sendStatus(200)
})

app.put("/students/:index", (req, res) => {
    var index = req.params.index
    if (students[index] !== undefined) {
        students[index] = req.body
        saveInJSONFile(students, studentsFileName)
        res.sendStatus(200)
    } else {
        res.status(404)
        res.json({ "message": "Not found" })
    }
})

app.patch("/students/:index/address", (req, res) => {
    var index = req.params.index
    if (students[index] !== undefined && students[index].hasOwnProperty("address")) {
        students[index]["address"] = req.body
        saveInJSONFile(students, studentsFileName)
        res.sendStatus(200)
    } else {
        res.status(404)
        res.json({ "message": "Not found" })
    }
})

app.delete("/students/:index", (req, res) => {
    var index = req.params.index
    if (students[index] !== undefined) {
        students.splice(index, 1)
        saveInJSONFile(students, studentsFileName)
        res.sendStatus(200)
    } else {
        res.status(404)
        res.json({ "message": "Not found" })
    }
})

function saveInJSONFile(data, fileName) {
    var jsonData = JSON.stringify(data, null, "\t")
    fs.writeFile(fileName, jsonData, function (err) {
        if (err) {
            console.log(err)
        }
    })
}

function readFromJSONFile(fileName) {
    var jsonData = fs.readFileSync(fileName, 'utf8');
    var data = JSON.parse(jsonData)
    return data
}

app.listen(port, () => {
    console.log("Listening on port", port)
})