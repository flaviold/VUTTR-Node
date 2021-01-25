import { ToolModel } from '@/domain/models/tool'

export interface LoadToolsRepository {
  load: () => Promise<ToolModel[]>
}
