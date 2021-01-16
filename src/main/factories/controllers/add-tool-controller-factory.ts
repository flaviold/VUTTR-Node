import { makeAddToolValidation } from '@/main/factories/controllers'
import { AddToolController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeDbAddTool } from '@/main/factories/usecases'

export const makeAddToolController = (): Controller => {
  return new AddToolController(makeAddToolValidation(), makeDbAddTool())
}
