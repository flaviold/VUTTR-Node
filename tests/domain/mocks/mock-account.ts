import { AccountModel } from '@/domain/models/account'
import { AddAccountModel, AuthenticationModel } from '@/domain/usecases'

import faker from 'faker'

export const makeAccount = (): AccountModel => ({
  id: faker.random.uuid(),
  name: faker.name.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const makeAddAccount = (): AddAccountModel => ({
  name: faker.name.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const makeAuthentication = (): AuthenticationModel => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})
