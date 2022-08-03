const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const fs = require('fs')

app.use(bodyParser.json())

var students = []

app.get("/students", (req, res) => {
    res.json(students)
})

app.get("/students/:index", (req, res) => {
    var index = req.params.index
    if (students[index] !== undefined) {
        res.json(students[index])
    } else {
        res.status(404)
        res.json({ "message": "Not found" })
    }
})

app.post("/students", (req, res) => {
    students.push(req.body)
    saveInJSONFile(students, "students.json")
    res.sendStatus(200)
})

app.put("/students/:index", (req, res) => {
    var index = req.params.index
    if (students[index] !== undefined) {
        students[index] = req.body
    } else {
        res.status(404)
        res.json({ "message": "Not found" })
    }
})

app.patch("/students/:index/address", (req, res) => {
    var index = req.params.index
    if (students[index] !== undefined && students[index].hasOwnProperty("Address")) {
        students[index]["Address"] = req.body
    } else {
        res.status(404)
        res.json({ "message": "Not found" })
    }
})

app.delete("/students/:index", (req, res) => {
    var index = req.params.index
    if (students[index] !== undefined) {
        students.splice(index, 1)
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

app.listen(port, () => {
    console.log("Listening on port", port)
})