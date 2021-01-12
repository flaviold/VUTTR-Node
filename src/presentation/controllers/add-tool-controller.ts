import { AddTool } from '@/domain/usecases'
import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/protocols'

export class AddToolController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addTool: AddTool
  ) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    this.validation.validate(request.body)
    await this.addTool.add(request.body)
    return null
  }
}
