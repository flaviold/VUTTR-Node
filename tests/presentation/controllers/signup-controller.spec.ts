import { SignUpController } from '@/presentation/controllers/signup-controller'
import { HttpRequest } from '@/presentation/protocols'
import { AddAccountSpy } from '@/tests/presentation/mocks/mock-account'

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
  addAccountSpy: AddAccountSpy
}

const makeSut = (): SutTypes => {
  const addAccountSpy = new AddAccountSpy()
  const sut = new SignUpController(addAccountSpy)
  return {
    sut,
    addAccountSpy
  }
}

describe('SignUp Controller', () => {
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
})
