import { Collection } from 'mongodb'
import { MongoHelper, ToolMongoRepository } from '@/infra/db/mongodb'

import { addTools, makeAddTool } from '@/tests/domain/mocks/mock-tool'

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
      addTools[0].tags.push('node')
      addTools[1].tags.push('node')
      await toolCollection.insertMany(addTools)
      const tools = await sut.loadByTags(['node'])
      expect(tools.length).toBe(2)
    })
  })

  describe('add()', () => {
    test('Should add a tool on success', async () => {
      const sut = makeSut()
      const addTool = makeAddTool()
      await sut.add(addTool)
      const [tool] = await toolCollection.find({}).toArray()
      expect(tool.title).toBe(addTool.title)
      expect(tool.link).toBe(addTool.link)
      expect(tool.description).toBe(addTool.description)
      expect(tool.tags).toEqual(addTool.tags)
    })

    test('Should return the added tool on success', async () => {
      const sut = makeSut()
      const addTool = makeAddTool()
      const tool = await sut.add(addTool)
      expect(tool.id).toBeTruthy()
      expect(tool.title).toBe(addTool.title)
      expect(tool.link).toBe(addTool.link)
      expect(tool.description).toBe(addTool.description)
      expect(tool.tags).toEqual(addTool.tags)
    })
  })

  describe('remove()', () => {
    test('Should remove the tool on success', async () => {
      const sut = makeSut()
      const [tool] = (await toolCollection.insertOne(makeAddTool())).ops
      let count = await toolCollection.find({}).count()
      expect(count).toBe(1)
      await sut.remove(tool._id)
      count = await toolCollection.find({}).count()
      expect(count).toBe(0)
    })
  })
})
