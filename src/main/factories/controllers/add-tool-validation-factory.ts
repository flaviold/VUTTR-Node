import { Validation } from '@/presentation/protocols'
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

export const makeAddToolValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['title', 'description', 'link']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
