export default {
  mongoUrl: process.env.MONGO_URL ?? 'mongodb://localhost:27017/vuttr',
  port: process.env.PORT ?? 3000
}
