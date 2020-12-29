import { Collection } from 'mongodb'
import { MongoHelper } from '@/infra/db/mongodb/mongo-helper'
import { ToolMongoRepository } from '@/infra/db/mongodb/tool-mongo-repository'
import { addTools } from '@/tests/domain/mocks/mock-tool'

let toolCollection: Collection

const makeSut = (): ToolMongoRepository => {
  return new ToolMongoRepository()
}

describe('ToolMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL ?? '')
  })

  beforeEach(async () => {
    toolCollection = await MongoHelper.getCollection('tools')
    await toolCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('load()', () => {
    test('Should return all tools on success', async () => {
      const sut = makeSut()
      await toolCollection.insertMany(addTools)
      const tools = await sut.load()
      expect(tools.length).toBe(3)
      expect(tools[0].id).toBeTruthy()
      expect(tools[0].title).toBe(addTools[0].title)
      expect(tools[0].link).toBe(addTools[0].link)
      expect(tools[0].description).toBe(addTools[0].description)
      expect(tools[0].tags).toEqual(addTools[0].tags)
    })
  })

  describe('loadByTags()', () => {
    test('Should return all tools with the provided tags', async () => {
      const sut = makeSut()
      await toolCollection.insertMany(addTools)
      const tools = await sut.loadByTags(['node'])
      expect(tools.length).toBe(2)
      expect(tools[0].id).toBeTruthy()
      expect(tools[0].title).toBe(addTools[1].title)
      expect(tools[0].link).toBe(addTools[1].link)
      expect(tools[0].description).toBe(addTools[1].description)
      expect(tools[0].tags).toEqual(addTools[1].tags)
    })
  })
})
