import { HttpRequest, HttpResponse } from '@/presentation/protocols'
import { AuthMiddleware } from '@/presentation/middlewares'
import { AccessDeniedError } from '@/validation/errors'
import { forbidden } from '@/presentation/helpers'
import { LoadAccountByTokenSpy } from '@/tests/presentation/mocks'

import faker from 'faker'

const tokenHeader = 'x-access-token'

const makeRequest = (): HttpRequest => ({
  headers: {
    [tokenHeader]: faker.random.uuid()
  }
})

interface SutTypes {
  sut: AuthMiddleware
  loadAccountByTokenSpy: LoadAccountByTokenSpy
}

const makeSut = (): SutTypes => {
  const loadAccountByTokenSpy = new LoadAccountByTokenSpy()
  const sut = new AuthMiddleware(tokenHeader, loadAccountByTokenSpy)
  return {
    sut,
    loadAccountByTokenSpy
  }
}

describe('AuthMiddleware', () => {
  test('Should return 403 if no accesstoken is provided', async () => {
    const { sut } = makeSut()
    const httpResponse: HttpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should call LoadAccountByToken with correct accessToken', async () => {
    const { sut, loadAccountByTokenSpy } = makeSut()
    const httpRequest = makeRequest()
    await sut.handle(httpRequest)
    expect(loadAccountByTokenSpy.input).toBe(httpRequest.headers[tokenHeader])
  })

  test('Should return 403 if LoadAccountByToken returns null', async () => {
    const { sut, loadAccountByTokenSpy } = makeSut()
    loadAccountByTokenSpy.result = null
    const httpResponse = await sut.handle(makeRequest())
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })
})
