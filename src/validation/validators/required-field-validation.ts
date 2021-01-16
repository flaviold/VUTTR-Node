import { Validation } from '@/presentation/protocols'
import { MissingParamError } from '@/validation/errors'

export class RequiredFieldValidation implements Validation {
  constructor (
    private readonly requiredField: string
  ) {}

  validate (input: any): Error {
    return input[this.requiredField]
      ? null
      : new MissingParamError(this.requiredField)
  }
}
