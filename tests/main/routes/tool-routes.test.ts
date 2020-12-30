import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db/mongodb/mongo-helper'

import { Collection } from 'mongodb'
import request from 'supertest'

let toolCollection: Collection

describe('Tool Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    toolCollection = await MongoHelper.getCollection('accounts')
    await toolCollection.deleteMany({})
  })

  describe('GET /tools', () => {
    test('Should return 204 when empty', async () => {
      await request(app)
        .get('/tools')
        .expect(204)
    })
  })
})
