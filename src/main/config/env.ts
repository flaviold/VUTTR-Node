export default {
  mongoUrl: process.env.MONGO_URL ?? 'mongodb://mongo:27017/vuttr',
  port: process.env.PORT ?? 3000
}
