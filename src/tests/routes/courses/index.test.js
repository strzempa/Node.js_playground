const request = require('supertest')
const app = require('../../../server')
const db = require('../../../database')
const commonHeaders = { authorization: 'Bearer abc' }

describe('Get /courses', () => {
  beforeEach(() => {
    mockCourses()
  })

  it('should get courses list', async () => {
    const res = await request(app)
      .get('/api/courses')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual([
      { id: 1, name: 'course1' },
      { id: 2, name: 'course2' }
    ])
  })
})

describe('Get /courses/1', () => {
  beforeEach(() => {
    mockCourses()
  })

  it('should get course', async () => {
    const res = await request(app)
      .get('/api/courses/1')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual({ id: 1, name: 'course1' })
  })

  it('should not get course asked for random id', async () => {
    const res = await request(app)
      .get('/api/courses/789')
    expect(res.statusCode).toEqual(404)
  })
})

describe('Post /courses', () => {
  it('should create a new course', async () => {
    const res = await request(app)
      .post('/api/courses')
      .set(commonHeaders)
      .send({
        name: 'tessadfisool'
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('name')
  })

  it('should create a new course with name with empty spaces', async () => {
    const res = await request(app)
      .post('/api/courses')
      .set(commonHeaders)
      .send({
        name: 'tes   sad  fiso ol'
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('name')
  })

  it('should not create a new course when name too short', async () => {
    const res = await request(app)
      .post('/api/courses')
      .set(commonHeaders)
      .send({
        name: '21'
      })
    expect(res.statusCode).toEqual(400)
  })

  it('should not create a new course when name too long', async () => {
    const res = await request(app)
      .post('/api/courses')
      .set(commonHeaders)
      .send({
        name: '2142423aafgadsfasasdfasdfasdfasdf asdf  as d f asd f a sdd'
      })
    expect(res.statusCode).toEqual(400)
  })
})

describe('Put /courses', () => {
  beforeEach(() => {
    mockCourses()
  })

  it('should update course', async () => {
    const res = await request(app)
      .put('/api/courses')
      .set(commonHeaders)
      .send({
        id: 2,
        name: 'afgsd'
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('name')
  })

  it('should not update course for unknown id', async () => {
    const res = await request(app)
      .put('/api/courses')
      .set(commonHeaders)
      .send({
        id: 2234213,
        name: 'afgsd'
      })
    expect(res.statusCode).toEqual(404)
  })
})

describe('Delete /courses', () => {
  it('should delete a course', async () => {
    const res = await request(app)
      .delete('/api/courses/1')
      .set(commonHeaders)
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual({ id: 1, name: 'course1' })
  })

  it('should not delete a course with unknown id', async () => {
    const res = await request(app)
      .delete('/api/courses/15341345134')
      .set(commonHeaders)
    expect(res.statusCode).toEqual(404)
  })

  it('should not delete a course with no id', async () => {
    const res = await request(app)
      .delete('/api/courses/')
      .set(commonHeaders)
    expect(res.statusCode).toEqual(404)
  })
})

function mockCourses () {
  const mock = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' }
  ]
  db.update(mock)
}
