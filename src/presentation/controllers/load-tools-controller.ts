import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { LoadTools } from '@/domain/usecases/load-tools'
import { ok } from '@/presentation/helpers'

export class LoadToolsController implements Controller {
  constructor (
    private readonly loadTools: LoadTools
  ) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    const tools = await this.loadTools.load(request.query?.tag)
    return ok(tools)
  }
}
