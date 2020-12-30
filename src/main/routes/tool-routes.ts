import { Router } from 'express'
import { adaptRoute } from '@/main/adapters/express/express-route-adapter'
import { makeLoadToolsController } from '@/main/factories'

export default (router: Router): void => {
  router.get('/tools', adaptRoute(makeLoadToolsController()))
}
