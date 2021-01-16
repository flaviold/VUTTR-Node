import { DbAddTool } from '@/data/usecases'
import { ToolMongoRepository } from '@/infra/db/mongodb'

export const makeDbAddTool = (): DbAddTool => {
  const toolMongoRepository = new ToolMongoRepository()
  return new DbAddTool(toolMongoRepository)
}
