import { LoadToolsController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeDbLoadTools } from '@/main/factories/usecases'

export const makeLoadToolsController = (): Controller => {
  const controller = new LoadToolsController(makeDbLoadTools())
  return controller
}
