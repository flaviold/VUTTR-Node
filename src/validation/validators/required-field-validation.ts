import { Validation } from '@/presentation/protocols'

export class RequiredFieldValidation implements Validation {
  constructor (
    private readonly requiredField: string
  ) {}

  validate (input: any): Error {
    return null
  }
}
