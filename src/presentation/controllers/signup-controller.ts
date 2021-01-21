import { AddAccount } from '@/domain/usecases'
import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/protocols'

export class SignUpController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addAccount: AddAccount
  ) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    this.validation.validate(request.body)
    const { email, name, password } = request.body
    await this.addAccount.add({
      email,
      name,
      password
    })
    return null
  }
}
