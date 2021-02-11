import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest } from '@/presentation/helpers'

export class LoginController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    const error = await this.validation.validate(request.body)
    if (error) {
      return badRequest(error)
    }
    return null
  }
}
