import { AddToolRepository, LoadToolByTagsRepository, LoadToolsRepository, RemoveToolRepository } from '@/data/protocols'
import { ToolModel } from '@/domain/models/tool'
import { AddToolModel } from '@/domain/usecases'
import { MongoHelper } from './mongo-helper'

export class ToolMongoRepository implements LoadToolsRepository, LoadToolByTagsRepository, AddToolRepository, RemoveToolRepository {
  async load (): Promise<ToolModel[]> {
    const toolCollection = await MongoHelper.getCollection('tools')
    const tools = await toolCollection.find().toArray()
    return MongoHelper.mapList(tools)
  }

  async loadByTags (tags: string[]): Promise<ToolModel[]> {
    const toolCollection = await MongoHelper.getCollection('tools')
    const tools = await toolCollection.find({ tags: { $all: tags } }).toArray()
    return MongoHelper.mapList(tools)
  }

  async add (toolData: AddToolModel): Promise<ToolModel> {
    const toolCollection = await MongoHelper.getCollection('tools')
    const tool = (await toolCollection.insertOne(toolData)).ops[0]
    return MongoHelper.map(tool)
  }

  async remove (id: string): Promise<void> {
    const toolCollection = await MongoHelper.getCollection('tools')
    await toolCollection.deleteOne({ _id: id })
  }
}
