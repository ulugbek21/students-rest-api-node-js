const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const studentControllers = require('./controllers/students')

app.use(bodyParser.json())

app.get("/students", studentControllers.getAllStudents)

app.get("/students/:index", studentControllers.getOneStudentByIndex)

app.get("/students/username/:username", studentControllers.getOneStudentByUsername)

app.post("/students", studentControllers.createStudent)

app.put("/students/:index", studentControllers.updateStudent)

app.patch("/students/:index/address", studentControllers.updateStudentAddress)

app.delete("/students/:index", studentControllers.deleteStudent) 

app.listen(port, () => {
    console.log("Listening on port", port)
})
