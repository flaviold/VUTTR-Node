import express from 'express'
import setupMiddlewares from './middlewares'

const app = express()

setupMiddlewares(app)

app.get('/', (req, res) => {
  res.send({ message: 'Hello!' })
})

export default app
