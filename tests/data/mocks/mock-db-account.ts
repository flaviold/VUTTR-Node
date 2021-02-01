import { AddAccountRepository, LoadAccountByEmailRepository, LoadAccountByTokenRepository, UpdateAccessTokenRepository } from '@/data/protocols'
import { AccountModel } from '@/domain/models/account'
import { AddAccountModel } from '@/domain/usecases'
import { makeAccount, makeAddAccount } from '@/tests/domain/mocks/mock-account'

import faker from 'faker'

export class LoadAccountByEmailRepositorySpy implements LoadAccountByEmailRepository {
  email: string
  result: AccountModel = makeAccount()

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

export class UpdateAccessTokenRepositorySpy implements UpdateAccessTokenRepository {
  id: string
  token: string

  async updateAccessToken (id: string, token: string): Promise<void> {
    this.id = id
    this.token = token
  }
}

export class LoadAccountByTokenRepositorySpy implements LoadAccountByTokenRepository {
  token: string
  result: AccountModel = {
    id: faker.random.uuid(),
    ...makeAddAccount()
  }

  async loadByToken (token: string): Promise<AccountModel> {
    this.token = token
    return this.result
  }
}
