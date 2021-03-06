import { JwtAdapter } from '@/infra/cryptography/jwt-adapter'

import jwt from 'jsonwebtoken'
import faker from 'faker'

const token = faker.random.uuid()

jest.mock('jsonwebtoken', () => ({
  async sign (payload: any, secret: string): Promise<string> {
    return token
  }
}))

interface SutTypes {
  sut: JwtAdapter
  secret: string
}

const makeSut = (): SutTypes => {
  const secret = faker.random.uuid()
  const sut = new JwtAdapter(secret)
  return {
    sut,
    secret
  }
}

describe('JwtAdapter', () => {
  test('Should call sign with correct values', async () => {
    const { sut, secret } = makeSut()
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt('any_value')
    expect(signSpy).toHaveBeenCalledWith('any_value', secret)
  })

  test('Should throw if sign throws', async () => {
    const { sut } = makeSut()
    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.encrypt('any_value')
    await expect(promise).rejects.toThrow()
  })

  test('Should return a token on sign success', async () => {
    const { sut } = makeSut()
    const accessToken = await sut.encrypt('any_value')
    expect(accessToken).toBe(token)
  })
})
