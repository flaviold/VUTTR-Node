import { SignUpController } from '@/presentation/controllers/signup-controller'
import { Controller } from '@/presentation/protocols'
import { makeSignUpValidation } from '@/main/factories/controllers'
import { makeDbAddAccount, makeDbAuthentication } from '@/main/factories/usecases'

export const makeSignUpController = (): Controller => {
  return new SignUpController(makeSignUpValidation(), makeDbAddAccount(), makeDbAuthentication())
}
