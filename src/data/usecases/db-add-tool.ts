import { ToolModel } from '@/domain/models/tool'
import { AddTool, AddToolModel } from '@/domain/usecases'
import { AddToolRepository } from '@/data/protocols'

export class DbAddTool implements AddTool {
  constructor (
    private readonly addToolRepository: AddToolRepository
  ) {}

  async add (toolData: AddToolModel): Promise<ToolModel> {
    await this.addToolRepository.add(toolData)
    return null
  }
}
