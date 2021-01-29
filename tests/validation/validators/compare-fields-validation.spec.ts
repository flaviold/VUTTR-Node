import { InvalidParamError } from '@/validation/errors'
import { CompareFieldsValidation } from '@/validation/validators'

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation('field', 'fieldToCompare')
}

describe('CompareFieldsValidation', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({
      field: 'any_value',
      fieldToCompare: 'different_values'
    })
    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })
})
