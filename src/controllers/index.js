const courses = require('./courses')

const get = async (req, res) => {
  res.send('Hello World')
}

module.exports = {
  courses,
  get
}
