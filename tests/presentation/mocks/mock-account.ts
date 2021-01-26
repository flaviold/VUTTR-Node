import { AccountModel } from '@/domain/models/account'
import { AddAccount, AddAccountModel, Authentication, AuthenticationModel } from '@/domain/usecases'
import { makeAccount } from '@/tests/domain/mocks/mock-account'

import faker from 'faker'

export class AddAccountSpy implements AddAccount {
  input?: AddAccountModel
  result: AccountModel = makeAccount()

  async add (account: AddAccountModel): Promise<AccountModel> {
    this.input = account
    return this.result
  }
}

export class AuthenticationSpy implements Authentication {
  input?: AuthenticationModel
  result: string = faker.random.uuid()

  async auth (authentication: AuthenticationModel): Promise<string> {
    this.input = authentication
    return this.result
  }
}
