import { ToolModel } from '@/domain/models/tool'
import { LoadTools } from '@/domain/usecases/load-tools'
import { makeTools } from '@/tests/domain/mocks/mock-tool'

export class LoadToolsSpy implements LoadTools {
  tag?: string | string[]
  result: ToolModel[] = makeTools()

  async load (tag?: string | string[]): Promise<ToolModel[]> {
    this.tag = tag
    return this.result
  }
}
