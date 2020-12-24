import { LoadToolsRepository } from '@/data/protocols/load-tools-repository'
import { ToolModel } from '@/domain/models/tool'
import { makeTools } from '@/tests/domain/mocks/mock-tool'

export class LoadToolsRepositorySpy implements LoadToolsRepository {
  result = makeTools()

  async load (): Promise<ToolModel[]> {
    return this.result
  }
}
