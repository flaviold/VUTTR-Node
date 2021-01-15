import { ValidationComposite } from '@/validation/validators'

import faker from 'faker'

interface SutTypes {
  sut: ValidationComposite
}

const makeSut = (): SutTypes => {
  const sut = new ValidationComposite()

  return {
    sut
  }
}

describe('Validation Composite', () => {
  test('Should return null when validation succeeds', () => {
    const { sut } = makeSut()
    const field = faker.random.word()
    const error = sut.validate({ [field]: faker.random.word() })
    expect(error).toBeFalsy()
  })
})
