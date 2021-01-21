import { AccountModel } from '@/domain/models/account'
import { AddAccount, AddAccountModel } from '@/domain/usecases'

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
