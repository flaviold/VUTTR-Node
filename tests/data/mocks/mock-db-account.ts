import { AddAccountRepository, LoadAccountByEmailRepository } from '@/data/protocols'
import { AccountModel } from '@/domain/models/account'
import { AddAccountModel } from '@/domain/usecases'

import faker from 'faker'

export const makeAddAccount = (): AddAccountModel => ({
  name: faker.name.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

export class LoadAccountByEmailRepositorySpy implements LoadAccountByEmailRepository {
  email: string
  result: AccountModel = null

  async loadByEmail (email: string): Promise<AccountModel> {
    this.email = email
    return this.result
  }
}

export class AddAccountRepositorySpy implements AddAccountRepository {
  input?: AddAccountModel
  result: AccountModel = {
    id: faker.random.uuid(),
    ...makeAddAccount()
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    this.input = accountData
    return this.result
  }
}
