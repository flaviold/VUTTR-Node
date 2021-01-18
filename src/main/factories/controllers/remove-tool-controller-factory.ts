import { RemoveToolController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeRemoveToolValidation } from '@/main/factories/controllers'
import { makeDbRemoveTool } from '@/main/factories/usecases'

export const makeRemoveToolController = (): Controller => {
  return new RemoveToolController(makeRemoveToolValidation(), makeDbRemoveTool())
}
