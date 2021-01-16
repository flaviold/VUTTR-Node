import { makeAddToolValidation } from '@/main/factories/controllers'
import { AddToolController } from '@/presentation/controllers/add-tool-controller'
import { Controller } from '@/presentation'
import { makeDbAddTool } from '@/main/factories/usecases'

export const makeAddToolController = (): Controller => {
  return new AddToolController(makeAddToolValidation(), makeDbAddTool())
}
