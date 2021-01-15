import { RequiredFieldValidation } from '@/validation/validators'
import { MissingParamError } from '@/validation/errors'

import faker from 'faker'

const field = 'requiredField'

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation(field)
}

describe('RequiredField Validation', () => {
  test('Should return null when validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ [field]: faker.random.word() })
    expect(error).toBeFalsy()
  })

  test('Should return MissingParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ })
    expect(error).toEqual(new MissingParamError(field))
  })
})
