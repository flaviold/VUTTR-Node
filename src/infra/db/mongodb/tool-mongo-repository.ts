import { LoadToolsRepository } from '@/data/protocols'
import { ToolModel } from '@/domain/models/tool'
import { MongoHelper } from './mongo-helper'

export class ToolMongoRepository implements LoadToolsRepository {
  async load (): Promise<ToolModel[]> {
    const toolCollection = await MongoHelper.getCollection('tools')
    const tools = await toolCollection.find().toArray()
    return MongoHelper.mapList(tools)
  }
}
