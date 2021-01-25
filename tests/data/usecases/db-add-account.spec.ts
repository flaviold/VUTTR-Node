import { DbAddAccount } from '@/data/usecases'
import { AddAccountRepositorySpy, HasherSpy, makeAddAccount } from '@/tests/data/mocks'

interface SutTypes {
  sut: DbAddAccount
  hasherSpy: HasherSpy
  addAccountRepositorySpy: AddAccountRepositorySpy
}

const makeSut = (): SutTypes => {
  const addAccountRepositorySpy = new AddAccountRepositorySpy()
  const hasherSpy = new HasherSpy()
  const sut = new DbAddAccount(hasherSpy, addAccountRepositorySpy)
  return {
    sut,
    hasherSpy,
    addAccountRepositorySpy
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

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, hasherSpy, addAccountRepositorySpy } = makeSut()
    const addAccount = makeAddAccount()
    await sut.add(addAccount)
    expect(addAccountRepositorySpy.input).toEqual({
      name: addAccount.name,
      email: addAccount.email,
      password: hasherSpy.result
    })
  })

  test('Should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositorySpy } = makeSut()
    jest.spyOn(addAccountRepositorySpy, 'add').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.add(makeAddAccount())
    await expect(promise).rejects.toThrow()
  })
})
