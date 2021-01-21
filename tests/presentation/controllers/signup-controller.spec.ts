import { SignUpController } from '@/presentation/controllers/signup-controller'
import { HttpRequest } from '@/presentation/protocols'
import { AddAccountSpy, ValidationSpy } from '@/tests/presentation/mocks'
import { badRequest, forbidden, serverError } from '@/presentation/helpers/http-helper'
import { EmailInUseError } from '@/validation/errors/email-in-use-error'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    email: 'any_email@mail.com',
    name: 'any_name',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
})

interface SutTypes {
  sut: SignUpController
  validationSpy: ValidationSpy
  addAccountSpy: AddAccountSpy
}

const makeSut = (): SutTypes => {
  const addAccountSpy = new AddAccountSpy()
  const validationSpy = new ValidationSpy()
  const sut = new SignUpController(validationSpy, addAccountSpy)
  return {
    sut,
    validationSpy,
    addAccountSpy
  }
}

describe('SignUp Controller', () => {
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

  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountSpy } = makeSut()
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(addAccountSpy.input).toEqual({
      email: httpRequest.body.email,
      name: httpRequest.body.name,
      password: httpRequest.body.password
    })
  })

  test('Should return 403 if AddAccount returns null', async () => {
    const { sut, addAccountSpy } = makeSut()
    addAccountSpy.result = null
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
  })

  test('Should return 500 if AddAccount throws', async () => {
    const { sut, addAccountSpy } = makeSut()
    jest.spyOn(addAccountSpy, 'add').mockImplementationOnce(() => { throw new Error() })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError())
  })
})
