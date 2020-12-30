import { LoadToolsController, Controller } from '@/presentation'
import { makeDbLoadTools } from '@/main/factories'

export const makeLoadToolsController = (): Controller => {
  const controller = new LoadToolsController(makeDbLoadTools())
  return controller
}
