import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db/mongodb'
import { addTools } from '@/tests/domain/mocks/mock-tool'

import { Collection } from 'mongodb'
import request from 'supertest'
import faker from 'faker'

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

  describe('POST /tools', () => {
    test('Should return 201 when add tool succeed', async () => {
      const addTool = {
        title: faker.random.word(),
        description: faker.random.words(),
        link: faker.internet.url(),
        tags: [
          faker.random.word(),
          faker.random.word(),
          faker.random.word()
        ]
      }
      const { body: tool } = await request(app)
        .post('/tools')
        .send(addTool)
        .expect(201)

      expect(tool.id).toBeTruthy()
      expect(tool.title).toBe(addTool.title)
      expect(tool.description).toBe(addTool.description)
      expect(tool.link).toBe(addTool.link)
      expect(tool.tags).toEqual(addTool.tags)
    })
  })
})
