const Joi = require('joi')
const database = require('../../database')
const auth = require('../../auth')
const coursesData = database.coursesData

const getAll = async (req, res) => {
  return res.status(200).send(database.current())
}

const updateCourseById = async (req, res) => {
  await auth.validate(req.headers)
    .catch(err => {
      return res.status(401).send(`Auth failed. ${err}`)
    })

  const course = database.current().find(c => c.id === parseInt(req.body.id))
  if (!course) return res.status(404).send(`Course for id ${req.body.id} not found`)

  const { error } = validateCourse(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const index = database.current().indexOf(course)
  database.current().splice(index, 1)

  course.name = req.body.name
  coursesData.push(course)
  return res.send(course)
}

const getCourseById = async (req, res) => {
  const course = database.current().find(c => c.id === parseInt(req.params.id))
  if (!course) return res.status(404).send(`Course for id ${req.params.id} not found`)
  res.send(course)
}

const createCourse = async (req, res) => {
  await auth.validate(req.headers)
    .catch(err => {
      return res.status(401).send(`Auth failed. ${err}`)
    })

  const { error } = validateCourse(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const course = { id: database.current().length + 1, name: req.body.name }
  coursesData.push(course)
  return res.send(course)
}

const deleteCourseById = async (req, res) => {
  await auth.validate(req.headers)
    .catch(err => {
      return res.status(401).send(`Auth failed. ${err}`)
    })

  const course = database.current().find(c => c.id === parseInt(req.params.id))
  if (!course) return res.status(404).send(`Course for id ${req.params.id} not found`)

  const index = database.current().indexOf(course)
  coursesData.splice(index, 1)
  return res.send(course)
}

function validateCourse (course) {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(30)
      .required(),
    id: Joi.number()
  })
  return schema.validate(course)
}

module.exports = {
  getAll,
  getCourseById,
  createCourse,
  updateCourseById,
  deleteCourseById
}
