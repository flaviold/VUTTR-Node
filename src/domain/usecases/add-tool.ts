import { ToolModel } from '@/domain/models/tool'

export class AddToolModel {
  title: string
  link: string
  description: string
  tags: string[]
}

export interface AddTool {
  add: (toolData: AddToolModel) => Promise<ToolModel>
}
