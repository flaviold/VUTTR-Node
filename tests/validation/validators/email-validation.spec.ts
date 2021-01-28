import { EmailValidation } from '@/validation/validators'
import { EmailValidatorSpy } from '@/tests/validation/mocks/mock-email-validatio'

import faker from 'faker'

interface SutTypes {
  sut: EmailValidation
  emailValidatorSpy: EmailValidatorSpy
}

const makeSut = (): SutTypes => {
  const emailValidatorSpy = new EmailValidatorSpy()
  const sut = new EmailValidation('email', emailValidatorSpy)
  return {
    sut,
    emailValidatorSpy
  }
}

describe('EmailValidation', () => {
  test('Should call EmailValidator with correct email', () => {
    const { sut, emailValidatorSpy } = makeSut()
    const email = faker.internet.email()
    sut.validate({ email })
    expect(emailValidatorSpy.email).toBe(email)
  })
})
