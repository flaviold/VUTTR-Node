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

  test('Should throw if Hasher throws', async () => {
    const { sut, hasherSpy } = makeSut()
    jest.spyOn(hasherSpy, 'hash').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.add(makeAddAccount())
    await expect(promise).rejects.toThrow()
  })
})
