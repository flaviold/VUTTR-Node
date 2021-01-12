import { ToolModel } from '@/domain/models/tool'
import { AddTool, AddToolModel, LoadTools } from '@/domain/usecases'
import { makeTools } from '@/tests/domain/mocks/mock-tool'

export class LoadToolsSpy implements LoadTools {
  tag?: string | string[]
  result: ToolModel[] = makeTools()

  async load (tag?: string | string[]): Promise<ToolModel[]> {
    this.tag = tag
    return this.result
  }
}

export class AddToolSpy implements AddTool {
  tool?: AddToolModel
  result: ToolModel = makeTools()[0]

  async add (toolData: AddToolModel): Promise<ToolModel> {
    this.tool = toolData
    return this.result
  }
}
