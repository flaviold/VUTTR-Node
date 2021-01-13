import { ToolModel } from '@/domain/models/tool'
import { AddToolModel } from '@/domain/usecases'

export interface AddToolRepository {
  add: (toolData: AddToolModel) => Promise<ToolModel>
}
