import { LoadAccountByToken } from '@/domain/usecases'
import { HttpRequest, HttpResponse, Middleware } from '@/presentation/protocols'
import { AccessDeniedError } from '@/validation/errors'
import { forbidden } from '@/presentation/helpers'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly tokenHeader: string,
    private readonly loadAccountByToken: LoadAccountByToken
  ) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    if (!request.headers?.[this.tokenHeader]) {
      return forbidden(new AccessDeniedError())
    }
    const { [this.tokenHeader]: accessToken } = request.headers
    await this.loadAccountByToken.load(accessToken)
    return null
  }
}
