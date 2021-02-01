import { DbLoadAccountByToken } from '@/data/usecases'
import { DecrypterSpy } from '@/tests/data/mocks'

import faker from 'faker'

interface SutTypes {
  sut: DbLoadAccountByToken
  decrypterSpy: DecrypterSpy
}

const makeSut = (): SutTypes => {
  const decrypterSpy = new DecrypterSpy()
  const sut = new DbLoadAccountByToken(decrypterSpy)
  return {
    sut,
    decrypterSpy
  }
}

describe('DbLoadAccountByToken', () => {
  test('Should call Decrypter with correct token', async () => {
    const { sut, decrypterSpy } = makeSut()
    const token = faker.random.uuid()
    await sut.load(token)
    expect(decrypterSpy.token).toBe(token)
  })
})
