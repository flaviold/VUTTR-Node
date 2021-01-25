import { ToolModel } from '@/domain/models/tool'

export interface LoadToolByTagsRepository {
  loadByTags: (tags: string[]) => Promise<ToolModel[]>
}
