import { LoadAccountByToken } from '@/domain/usecases'
import { HttpRequest, HttpResponse, Middleware } from '@/presentation/protocols'
import { AccessDeniedError } from '@/validation/errors'
import { forbidden, serverError } from '@/presentation/helpers'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly tokenHeader: string,
    private readonly loadAccountByToken: LoadAccountByToken
  ) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      if (!request.headers?.[this.tokenHeader]) {
        return forbidden(new AccessDeniedError())
      }
      const { [this.tokenHeader]: accessToken } = request.headers
      const account = await this.loadAccountByToken.load(accessToken)
      if (!account) {
        return forbidden(new AccessDeniedError())
      }
      return null
    } catch {
      return serverError()
    }
  }
}
