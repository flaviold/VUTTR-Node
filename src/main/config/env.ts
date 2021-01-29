export default {
  mongoUrl: process.env.MONGO_URL ?? 'mongodb://localhost:27017/vuttr',
  port: process.env.PORT ?? 3000,
  jwtSecret: process.env.JWT_SECRET || 'GwdSdwDW#4-)/YnADwda24ws'
}
