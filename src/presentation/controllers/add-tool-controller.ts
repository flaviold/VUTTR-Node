import { AddTool } from '@/domain/usecases'
import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest } from '@/presentation/helpers'

export class AddToolController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addTool: AddTool
  ) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(request.body)
    if (error) {
      return badRequest(error)
    }
    await this.addTool.add(request.body)
    return null
  }
}
