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

  test('Should return null if Decrypter returns null', async () => {
    const { sut, decrypterSpy } = makeSut()
    decrypterSpy.result = null
    const account = await sut.load(faker.random.uuid())
    expect(account).toBeNull()
  })

  test('Should return null if Decrypter throws', async () => {
    const { sut, decrypterSpy } = makeSut()
    jest.spyOn(decrypterSpy, 'decrypt').mockImplementationOnce(() => { throw new Error() })
    const account = await sut.load(faker.random.uuid())
    expect(account).toBeNull()
  })
})
