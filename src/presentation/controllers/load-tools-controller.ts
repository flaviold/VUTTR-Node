import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { LoadTools } from '@/domain/usecases/load-tools'
import { noContent, ok, serverError } from '@/presentation/helpers'

export class LoadToolsController implements Controller {
  constructor (
    private readonly loadTools: LoadTools
  ) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const tools = await this.loadTools.load(request.query?.tag)
      return tools.length ? ok(tools) : noContent()
    } catch (error) {
      return serverError()
    }
  }
}
