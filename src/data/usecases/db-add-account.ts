import { AccountModel } from '@/domain/models/account'
import { AddAccount, AddAccountModel } from '@/domain/usecases'
import { AddAccountRepository, Hasher, LoadAccountByEmailRepository } from '@/data/protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async add (addAccount: AddAccountModel): Promise<AccountModel> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(addAccount.email)
    if (account) {
      return null
    }
    const hashedPassword = await this.hasher.hash(addAccount.password)
    const newAccount = await this.addAccountRepository.add({
      ...addAccount,
      password: hashedPassword
    })
    return newAccount
  }
}
