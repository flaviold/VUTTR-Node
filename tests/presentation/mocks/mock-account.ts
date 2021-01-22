import { AccountModel } from '@/domain/models/account'
import { AddAccount, AddAccountModel, Authentication, AuthenticationModel } from '@/domain/usecases'

import faker from 'faker'

export const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password'
})

export class AddAccountSpy implements AddAccount {
  input?: AddAccountModel
  result: AccountModel = makeFakeAccount()

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
