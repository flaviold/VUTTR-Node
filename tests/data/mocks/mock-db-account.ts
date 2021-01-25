import { AddAccountModel } from '@/domain/usecases'

import faker from 'faker'

export const makeAddAccount = (): AddAccountModel => ({
  name: faker.name.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})
