const helpers = require('../helpers/helpers')
const studentsFileName = "students.json"

var students = []
students = helpers.readFromJSONFile(studentsFileName)

// controller for getting all students
function getAllStudents(req, res) {
    students = helpers.readFromJSONFile(studentsFileName)
    res.json(students)
}

function getOneStudentByIndex(req, res) {
    students = helpers.readFromJSONFile(studentsFileName)
    var index = req.params.index
    if (students[index] !== undefined) {
        res.json(students[index])
    } else {
        res.status(404)
        res.json({ "message": "Not found" })
    }
}

function getOneStudentByUsername(req, res) {
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
}

function createStudent(req, res) {
    var student = req.body
    if (!validateStudent(res, student)) {
        return
    }
    students.push(student)
    helpers.saveInJSONFile(students, studentsFileName)
    res.sendStatus(200)
}

function updateStudent(req, res) {
    var index = req.params.index
    var student = req.body
    if (!validateStudent(res, student)) {
        return
    }
    if (students[index] !== undefined) {
        students[index] = student
        helpers.saveInJSONFile(students, studentsFileName)
        res.sendStatus(200)
    } else {
        res.status(404)
        res.json({ "message": "Not found" })
    }
}

function updateStudentAddress(req, res) {
    var index = req.params.index
    if (students[index] !== undefined && students[index].hasOwnProperty("address")) {
        students[index]["address"] = req.body
        helpers.saveInJSONFile(students, studentsFileName)
        res.sendStatus(200)
    } else {
        res.status(404)
        res.json({ "message": "Not found" })
    }
}

function deleteStudent(req, res) {
    var index = req.params.index
    if (students[index] !== undefined) {
        students.splice(index, 1)
        helpers.saveInJSONFile(students, studentsFileName)
        res.sendStatus(200)
    } else {
        res.status(404)
        res.json({ "message": "Not found" })
    }
}

function validateStudent(res, student) {
    if (!student["firstName"] ||
        !student["lastName"] ||
        !student["username"] ||
        !student["age"] ||
        !student["phone"] ||
        !student["address"]
    ) {
        res.status(400)
        res.json({ "message": "invalid fields" })
        return false
    }
    return true
}



module.exports = {
    getAllStudents,
    getOneStudentByIndex,
    getOneStudentByUsername,
    createStudent,
    updateStudent,
    updateStudentAddress,
    deleteStudent,
}