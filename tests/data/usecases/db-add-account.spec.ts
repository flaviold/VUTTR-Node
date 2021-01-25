import { DbAddAccount } from '@/data/usecases'
import { HasherSpy, makeAddAccount } from '@/tests/data/mocks'

interface SutTypes {
  sut: DbAddAccount
  hasherSpy: HasherSpy
}

const makeSut = (): SutTypes => {
  const hasherSpy = new HasherSpy()
  const sut = new DbAddAccount(hasherSpy)
  return {
    sut,
    hasherSpy
  }
}

describe('DbAddAccount', () => {
  test('Should call Hasher with correct password', async () => {
    const { sut, hasherSpy } = makeSut()
    const addAccount = makeAddAccount()
    await sut.add(addAccount)
    expect(hasherSpy.value).toBe(addAccount.password)
  })
})
