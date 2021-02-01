import { DbLoadAccountByToken } from '@/data/usecases'
import { DecrypterSpy, LoadAccountByTokenRepositorySpy } from '@/tests/data/mocks'

import faker from 'faker'

interface SutTypes {
  sut: DbLoadAccountByToken
  decrypterSpy: DecrypterSpy
  loadAccountByTokenRepositorySpy: LoadAccountByTokenRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadAccountByTokenRepositorySpy = new LoadAccountByTokenRepositorySpy()
  const decrypterSpy = new DecrypterSpy()
  const sut = new DbLoadAccountByToken(decrypterSpy, loadAccountByTokenRepositorySpy)
  return {
    sut,
    decrypterSpy,
    loadAccountByTokenRepositorySpy
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

  test('Should call LoadAccountByTokenRepository with correct token', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    const token = faker.random.uuid()
    await sut.load(token)
    expect(loadAccountByTokenRepositorySpy.token).toBe(token)
  })

  test('Should throw if LoadAccountByTokenRepository throws', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    jest.spyOn(loadAccountByTokenRepositorySpy, 'loadByToken').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.load(faker.random.uuid())
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if LoadAccountByTokenRepository returns null', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    loadAccountByTokenRepositorySpy.result = null
    const account = await sut.load(faker.random.uuid())
    expect(account).toBeNull()
  })
})
