import { AddAccount } from '@/domain/usecases'
import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, forbidden, serverError } from '@/presentation/helpers'
import { EmailInUseError } from '@/validation/errors/email-in-use-error'

export class SignUpController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addAccount: AddAccount
  ) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request.body)
      if (error) {
        return badRequest(error)
      }
      const { email, name, password } = request.body
      const account = await this.addAccount.add({
        email,
        name,
        password
      })
      if (!account) {
        return forbidden(new EmailInUseError())
      }
      return null
    } catch {
      return serverError()
    }
  }
}
