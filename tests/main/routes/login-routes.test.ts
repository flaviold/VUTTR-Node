import app from '@/main/config/app'
import faker from 'faker'
import request from 'supertest'
import { Collection } from 'mongodb'
import { MongoHelper } from '@/infra/db/mongodb'

let accountCollection: Collection

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
      const password = faker.internet.password()
      await request(app)
        .post('/signup')
        .send({
          name: faker.name.firstName(),
          email: faker.internet.email(),
          password: password,
          passwordConfirmation: password
        })
        .expect(200)
    })
  })
})
