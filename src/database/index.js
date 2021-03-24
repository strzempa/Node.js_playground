let coursesData = []

function update (data) {
  coursesData = data
}

function current () {
  return coursesData
}

module.exports = {
  coursesData: coursesData,
  current: current,
  update
}
