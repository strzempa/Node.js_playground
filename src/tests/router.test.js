const express = require('express')
const request = require('supertest')
const app = require('../server')

describe('Get /api', () => {
  it('should get default data', async () => {
    const res = await request(app)
      .get('/api')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual({})
  })
})
