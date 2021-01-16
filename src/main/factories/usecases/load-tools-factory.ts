import { DbLoadTools } from '@/data/usecases'
import { LoadTools } from '@/domain/usecases/load-tools'
import { ToolMongoRepository } from '@/infra/db/mongodb'

export const makeDbLoadTools = (): LoadTools => {
  const toolMongoRepository = new ToolMongoRepository()
  const usecase = new DbLoadTools(toolMongoRepository, toolMongoRepository)
  return usecase
}
