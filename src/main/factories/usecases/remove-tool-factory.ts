import { DbRemoveTool } from '@/data/usecases'
import { ToolMongoRepository } from '@/infra/db/mongodb'

export const makeDbRemoveTool = (): DbRemoveTool => {
  const toolMongoRepository = new ToolMongoRepository()
  return new DbRemoveTool(toolMongoRepository)
}
