import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/protocols'

export class RemoveToolController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    this.validation.validate(request.params)
    return null
  }
}
