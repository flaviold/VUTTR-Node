import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest } from '@/presentation/helpers'
import { Authentication } from '@/domain/usecases'

export class LoginController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    const error = await this.validation.validate(request.body)
    if (error) {
      return badRequest(error)
    }
    const { email, password } = request.body
    await this.authentication.auth({
      email,
      password
    })
    return null
  }
}
