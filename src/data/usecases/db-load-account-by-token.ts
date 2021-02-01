import { AccountModel } from '@/domain/models/account'
import { LoadAccountByToken } from '@/domain/usecases'
import { Decrypter } from '@/data/protocols'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter
  ) {}

  async load (token: string): Promise<AccountModel> {
    let tokenObj: any
    try {
      tokenObj = await this.decrypter.decrypt(token)
    } catch {
      return null
    }
    if (!tokenObj) {
      return null
    }
  }
}
