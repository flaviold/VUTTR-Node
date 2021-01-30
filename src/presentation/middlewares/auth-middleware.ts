import { HttpRequest, HttpResponse, Middleware } from '@/presentation/protocols'
import { AccessDeniedError } from '@/validation/errors'
import { forbidden } from '../helpers'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly tokenHeader: string
  ) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    if (!request.headers?.[this.tokenHeader]) {
      return forbidden(new AccessDeniedError())
    }
    return null
  }
}
