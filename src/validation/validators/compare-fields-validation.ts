import { Validation } from '@/presentation/protocols'
import { InvalidParamError } from '@/validation/errors'

export class CompareFieldsValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly fieldToCompareName: string
  ) {}

  validate (input: any): Error {
    if (input[this.fieldName] !== input[this.fieldToCompareName]) return new InvalidParamError(this.fieldToCompareName)
  }
}
