import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db/mongodb/mongo-helper'
import { addTools } from '@/tests/domain/mocks/mock-tool'

import { Collection } from 'mongodb'
import request from 'supertest'

let toolCollection: Collection

const insertTools = async (): Promise<void> => {
  await toolCollection.insertMany(addTools)
}

describe('Tool Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    toolCollection = await MongoHelper.getCollection('tools')
    await toolCollection.deleteMany({})
  })

  describe('GET /tools', () => {
    test('Should return 200 when there are tools to return', async () => {
      await insertTools()
      await request(app)
        .get('/tools')
        .expect(200)
    })

    test('Should return 204 when empty', async () => {
      await request(app)
        .get('/tools')
        .expect(204)
    })
  })
})