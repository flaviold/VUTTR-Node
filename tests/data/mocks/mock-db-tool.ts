import { LoadToolByTagsRepository, LoadToolsRepository } from '@/data/protocols'
import { ToolModel } from '@/domain/models/tool'
import { makeTools } from '@/tests/domain/mocks/mock-tool'

export class LoadToolsRepositorySpy implements LoadToolsRepository {
  result = makeTools()

  async load (): Promise<ToolModel[]> {
    return this.result
  }
}

export class LoadToolByTagsRepositorySpy implements LoadToolByTagsRepository {
  tags?: string[]
  result = makeTools()

  async loadByTags (tags: string[]): Promise<ToolModel[]> {
    this.tags = tags
    return this.result
  }
}
