import { ToolModel } from '@/domain/models/tool'

export interface LoadTools {
  load: (tag?: string | string[]) => Promise<ToolModel[]>
}
