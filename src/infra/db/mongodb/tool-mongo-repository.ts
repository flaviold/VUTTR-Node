import { LoadToolByTagsRepository, LoadToolsRepository } from '@/data/protocols'
import { ToolModel } from '@/domain/models/tool'
import { MongoHelper } from './mongo-helper'

export class ToolMongoRepository implements LoadToolsRepository, LoadToolByTagsRepository {
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
}
