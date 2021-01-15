import { ValidationComposite } from '@/validation/validators'
import { ValidationSpy } from '@/tests/presentation/mocks'

import faker from 'faker'

interface SutTypes {
  sut: ValidationComposite
  validationSpies: ValidationSpy[]
}

const makeSut = (): SutTypes => {
  const validationSpies = [
    new ValidationSpy(),
    new ValidationSpy(),
    new ValidationSpy(),
    new ValidationSpy()
  ]
  const sut = new ValidationComposite(validationSpies)
  return {
    sut,
    validationSpies
  }
}

describe('Validation Composite', () => {
  test('Should return null when validation succeeds', () => {
    const { sut } = makeSut()
    const field = faker.random.word()
    const error = sut.validate({ [field]: faker.random.word() })
    expect(error).toBeFalsy()
  })

  test('Should return an error if any validation fails', () => {
    const { sut, validationSpies } = makeSut()
    validationSpies[0].error = new Error()
    const field = faker.random.word()
    const error = sut.validate({ [field]: faker.random.word() })
    expect(error).toEqual(new Error())
  })
})
