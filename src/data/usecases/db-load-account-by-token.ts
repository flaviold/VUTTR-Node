import { AccountModel } from '@/domain/models/account'
import { LoadAccountByToken } from '@/domain/usecases'
import { Decrypter, LoadAccountByTokenRepository } from '@/data/protocols'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
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
    await this.loadAccountByTokenRepository.loadByToken(token)
  }
}
