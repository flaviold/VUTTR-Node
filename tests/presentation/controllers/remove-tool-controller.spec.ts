import { RemoveToolController } from '@/presentation/controllers'
import { ValidationSpy } from '@/tests/presentation/mocks'

import faker from 'faker'

interface SutTypes {
  sut: RemoveToolController
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = new RemoveToolController(validationSpy)
  return {
    sut,
    validationSpy
  }
}

describe('RemoveToolController', () => {
  test('Should call Validation with correct input', async () => {
    const { sut, validationSpy } = makeSut()
    const httpRequest = {
      params: {
        id: faker.random.uuid()
      }
    }
    await sut.handle(httpRequest)
    expect(validationSpy.input).toEqual(httpRequest.params)
  })
})
