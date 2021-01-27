import { Authentication, AuthenticationModel } from '@/domain/usecases'
import { HashComparer, LoadAccountByEmailRepository } from '@/data/protocols'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer
  ) {}

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authentication.email)
    if (!account) {
      return null
    }
    const isValid = await this.hashComparer.compare(authentication.password, account.password)
    if (!isValid) {
      return null
    }
  }
}
