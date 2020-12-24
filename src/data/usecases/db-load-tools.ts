import { ToolModel } from '@/domain/models/tool'
import { LoadTools } from '@/domain/usecases/load-tools'
import { LoadToolsRepository } from '@/data/protocols'

export class DbLoadTools implements LoadTools {
  constructor (
    private readonly loadToolsRepository: LoadToolsRepository
  ) {}

  async load (tag?: string | string[] | undefined): Promise<ToolModel[]> {
    if (!tag) {
      await this.loadToolsRepository.load()
    }
    return []
  }
}
