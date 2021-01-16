import { ToolModel } from '@/domain/models/tool'
import { LoadTools } from '@/domain/usecases'
import { LoadToolByTagsRepository, LoadToolsRepository } from '@/data/protocols'

export class DbLoadTools implements LoadTools {
  constructor (
    private readonly loadToolsRepository: LoadToolsRepository,
    private readonly loadToolByTagsRepository: LoadToolByTagsRepository
  ) {}

  async load (tag?: string | string[]): Promise<ToolModel[]> {
    const tools = tag ? await this.loadToolByTagsRepository.loadByTags(typeof tag === 'string' ? [tag] : tag) : await this.loadToolsRepository.load()
    return tools
  }
}
