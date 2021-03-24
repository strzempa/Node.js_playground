const Joi = require('joi')

function validateHeaders (headers) {
  const schema = Joi.object({
    authorization: Joi.string()
      .required()
  }).options({ allowUnknown: true })
  return schema.validate(headers)
}

const validate = async (headers) => {
  // TODO actual auth
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const { error } = validateHeaders(headers)
      if (error) reject(error)

      const [authType, token] = headers.authorization.trim().split(' ')
      if (authType !== 'Bearer') reject(Error('Expected a Bearer token'))

      console.log(`${token}`)

      resolve()
    }, 100)
  })
}

module.exports = {
  validate
}
