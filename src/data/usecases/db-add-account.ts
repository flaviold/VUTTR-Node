import { AccountModel } from '@/domain/models/account'
import { AddAccount, AddAccountModel } from '@/domain/usecases'
import { Hasher } from '@/data/protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher
  ) {}

  async add (account: AddAccountModel): Promise<AccountModel> {
    await this.hasher.hash(account.password)
    return null
  }
}
