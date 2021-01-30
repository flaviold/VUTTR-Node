import { HttpResponse } from '@/presentation/protocols'
import { AuthMiddleware } from '@/presentation/middlewares'
import { AccessDeniedError } from '@/validation/errors'
import { forbidden } from '@/presentation/helpers'

const tokenHeader = 'x-access-token'

interface SutTypes {
  sut: AuthMiddleware
}

const makeSut = (): SutTypes => {
  const sut = new AuthMiddleware(tokenHeader)
  return {
    sut
  }
}

describe('AuthMiddleware', () => {
  test('Should return 403 if no accesstoken is provided', async () => {
    const { sut } = makeSut()
    const httpResponse: HttpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })
})
