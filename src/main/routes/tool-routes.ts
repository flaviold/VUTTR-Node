import { Router } from 'express'
import { adaptRoute } from '@/main/adapters/express/express-route-adapter'
import { makeAddToolController, makeLoadToolsController, makeRemoveToolController } from '@/main/factories/controllers'

export default (router: Router): void => {
  router.get('/tools', adaptRoute(makeLoadToolsController()))
  router.post('/tools', adaptRoute(makeAddToolController()))
  router.delete('/tools/:id', adaptRoute(makeRemoveToolController()))
}
