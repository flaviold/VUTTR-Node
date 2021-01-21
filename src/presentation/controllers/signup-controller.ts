import { AddAccount } from '@/domain/usecases'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount
  ) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    const { email, name, password } = request.body
    await this.addAccount.add({
      email,
      name,
      password
    })
    return null
  }
}
