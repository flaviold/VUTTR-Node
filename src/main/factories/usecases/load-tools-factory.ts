import { DbLoadTools } from '@/data/usecases/db-load-tools'
import { LoadTools } from '@/domain/usecases/load-tools'
import { ToolMongoRepository } from '@/infra/db/mongodb/tool-mongo-repository'

export const makeDbLoadTools = (): LoadTools => {
  const toolMongoRepository = new ToolMongoRepository()
  const usecase = new DbLoadTools(toolMongoRepository, toolMongoRepository)
  return usecase
}
