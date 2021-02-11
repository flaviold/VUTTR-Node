import { HttpRequest } from '@/presentation/protocols'
import { LoginController } from '@/presentation/controllers'
import { ValidationSpy, AuthenticationSpy } from '@/tests/presentation/mocks'
import { badRequest, ok, serverError, unauthorized } from '@/presentation/helpers'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    email: 'any_email@mail.com',
    name: 'any_name',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
})

interface SutTypes {
  sut: LoginController
  validationSpy: ValidationSpy
  authenticationSpy: AuthenticationSpy
}

const makeSut = (): SutTypes => {
  const authenticationSpy = new AuthenticationSpy()
  const validationSpy = new ValidationSpy()
  const sut = new LoginController(validationSpy, authenticationSpy)
  return {
    sut,
    validationSpy,
    authenticationSpy
  }
}

describe('LoginController', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validationSpy.input).toBe(httpRequest.body)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new Error()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()
    const request = makeFakeRequest()
    await sut.handle(request)
    expect(authenticationSpy.input).toEqual({
      email: request.body.email,
      password: request.body.password
    })
  })

  test('Should return 401 if Authentication returns null', async () => {
    const { sut, authenticationSpy } = makeSut()
    authenticationSpy.result = null
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(unauthorized())
  })

  test('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationSpy } = makeSut()
    jest.spyOn(authenticationSpy, 'auth').mockImplementationOnce(() => { throw new Error() })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError())
  })

  test('Should return 200 on success', async () => {
    const { sut, authenticationSpy } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok({ accessToken: authenticationSpy.result }))
  })
})
