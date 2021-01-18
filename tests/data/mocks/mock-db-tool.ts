import { AddToolRepository, LoadToolByTagsRepository, LoadToolsRepository, RemoveToolRepository } from '@/data/protocols'
import { ToolModel } from '@/domain/models/tool'
import { AddToolModel } from '@/domain/usecases'
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

export class AddToolRepositorySpy implements AddToolRepository {
  toolData: AddToolModel

  async add (toolData: AddToolModel): Promise<ToolModel> {
    this.toolData = toolData
    return {
      id: 'any_id',
      ...toolData
    }
  }
}

export class RemoveToolRepositorySpy implements RemoveToolRepository {
  id: string

  async remove (id: string): Promise<void> {
    this.id = id
  }
}
