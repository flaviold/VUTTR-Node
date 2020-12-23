import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { LoadTools } from '@/domain/usecases/load-tools'

export class LoadToolsController implements Controller {
  constructor (
    private readonly loadTools: LoadTools
  ) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    await this.loadTools.load(request.query?.tag)
    return {
      statusCode: 200,
      body: {}
    }
  }
}
