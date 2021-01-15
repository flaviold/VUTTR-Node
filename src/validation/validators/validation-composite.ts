import { Validation } from '@/presentation/protocols'

export class ValidationComposite implements Validation {
  validate (input: any): Error {
    return null
  }
}
