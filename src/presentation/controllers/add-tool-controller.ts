import { AddTool } from '@/domain/usecases'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class AddToolController implements Controller {
  constructor (
    private readonly addTool: AddTool
  ) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    await this.addTool.add(request.body)
    return null
  }
}
