import { RemoveToolController } from '@/presentation/controllers'
import { RemoveToolSpy, ValidationSpy } from '@/tests/presentation/mocks'
import { HttpRequest } from '@/presentation/protocols'
import { badRequest } from '@/presentation/helpers'

import faker from 'faker'

const makeRequest = (): HttpRequest => ({
  params: {
    id: faker.random.uuid()
  }
})

interface SutTypes {
  sut: RemoveToolController
  validationSpy: ValidationSpy
  removeToolSpy: RemoveToolSpy
}

const makeSut = (): SutTypes => {
  const removeToolSpy = new RemoveToolSpy()
  const validationSpy = new ValidationSpy()
  const sut = new RemoveToolController(validationSpy, removeToolSpy)
  return {
    sut,
    validationSpy,
    removeToolSpy
  }
}

describe('RemoveToolController', () => {
  test('Should call Validation with correct input', async () => {
    const { sut, validationSpy } = makeSut()
    const httpRequest = makeRequest()
    await sut.handle(httpRequest)
    expect(validationSpy.input).toEqual(httpRequest.params)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new Error()
    const httpResponse = await sut.handle(makeRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call RemoveTool with correct id', async () => {
    const { sut, removeToolSpy } = makeSut()
    const httpRequest = makeRequest()
    await sut.handle(httpRequest)
    expect(removeToolSpy.id).toEqual(httpRequest.params.id)
  })
})
