import { AddToolRepository, LoadToolByTagsRepository, LoadToolsRepository } from '@/data/protocols'
import { ToolModel } from '@/domain/models/tool'
import { AddToolModel } from '@/domain/usecases'
import { MongoHelper } from './mongo-helper'

export class ToolMongoRepository implements LoadToolsRepository, LoadToolByTagsRepository, AddToolRepository {
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
    await toolCollection.insertOne(toolData)
    return null
  }
}
