import { BcryptAdapter } from '@/infra/db/cryptography/bcrypt-adapter'

import bcrypt from 'bcrypt'
import faker from 'faker'

const hash = faker.random.uuid()

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return hash
  },

  async compare (): Promise<boolean> {
    return true
  }
}))

interface SutTypes {
  sut: BcryptAdapter
  salt: number
}

const makeSut = (): SutTypes => {
  const salt = 12
  const sut = new BcryptAdapter(salt)
  return {
    sut,
    salt
  }
}

describe('BcryptAdapter', () => {
  describe('hash()', () => {
    test('Should call bcrypt hash with correct values', async () => {
      const { sut, salt } = makeSut()
      const hashSpy = jest.spyOn(bcrypt, 'hash')
      await sut.hash('any_value')
      expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
    })

    test('Should throw if bcrypt hash throws', async () => {
      const { sut } = makeSut()
      jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => { throw new Error() })
      await expect(sut.hash('any_value')).rejects.toThrow()
    })

    test('Should return a valid hash on hash success', async () => {
      const { sut } = makeSut()
      const validHash = await sut.hash('any_value')
      expect(validHash).toBe(hash)
    })
  })

  describe('compare()', () => {
    test('Should call bcrypt compare with correct values', async () => {
      const { sut } = makeSut()
      const compareSpy = jest.spyOn(bcrypt, 'compare')
      await sut.compare('any_value', hash)
      expect(compareSpy).toHaveBeenCalledWith('any_value', hash)
    })

    test('Should throw if bcrypt compare throws', async () => {
      const { sut } = makeSut()
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => { throw new Error() })
      await expect(sut.compare('any_value', hash)).rejects.toThrow()
    })

    test('Should return true when compare success', async () => {
      const { sut } = makeSut()
      const isEqual = await sut.compare('any_value', hash)
      expect(isEqual).toBe(true)
    })

    test('Should return false when compare fails', async () => {
      const { sut } = makeSut()
      jest.spyOn(bcrypt, 'compare').mockReturnValueOnce(Promise.resolve(false))
      const isEqual = await sut.compare('any_value', hash)
      expect(isEqual).toBe(false)
    })
  })
})
