import request from 'supertest'
import app from '@/main/config/app'

describe('Body parser Middleware', () => {
  test('Should parse body as json', async () => {
    app.post('/', (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .post('/')
      .send({ message: 'Hello!' })
      .expect({ message: 'Hello!' })
  })
})
