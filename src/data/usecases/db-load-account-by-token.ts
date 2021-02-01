import { AccountModel } from '@/domain/models/account'
import { LoadAccountByToken } from '@/domain/usecases'
import { Decrypter } from '@/data/protocols'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter
  ) {}

  async load (token: string): Promise<AccountModel> {
    await this.decrypter.decrypt(token)
    return null
  }
}
