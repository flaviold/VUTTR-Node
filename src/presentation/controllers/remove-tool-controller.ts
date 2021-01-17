import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest } from '@/presentation/helpers'

export class RemoveToolController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(request.params)
    if (error) {
      return badRequest(error)
    }
    return null
  }
}
