import { RemoveTool } from '@/domain/usecases'
import { RemoveToolRepository } from '@/data/protocols'

export class DbRemoveTool implements RemoveTool {
  constructor (
    private readonly removeToolRepository: RemoveToolRepository
  ) {}

  async remove (id: string): Promise<void> {
    await this.removeToolRepository.remove(id)
  }
}
