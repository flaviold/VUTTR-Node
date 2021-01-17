import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, noContent, serverError } from '@/presentation/helpers'
import { RemoveTool } from '@/domain/usecases'

export class RemoveToolController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly removeTool: RemoveTool
  ) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request.params)
      if (error) {
        return badRequest(error)
      }
      const { id } = request.params
      await this.removeTool.remove(id)
      return noContent()
    } catch {
      return serverError()
    }
  }
}
