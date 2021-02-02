import { Collection } from 'mongodb'
import { AccountMongoRepository, MongoHelper } from '@/infra/db/mongodb'
import { makeAddAccount } from '@/tests/domain/mocks/mock-account'

import faker from 'faker'

let accountCollection: Collection

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository()
}

describe('AccountMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL ?? '')
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('add()', () => {
    test('Should add an account on success', async () => {
      const sut = makeSut()
      const addAccount = makeAddAccount()
      await sut.add(addAccount)
      const [account] = await accountCollection.find({}).toArray()
      expect(account.email).toBe(addAccount.email)
      expect(account.name).toBe(addAccount.name)
      expect(account.password).toBe(addAccount.password)
    })

    test('Should return an account on success', async () => {
      const sut = makeSut()
      const addAccount = makeAddAccount()
      const account = await sut.add(addAccount)
      expect(account.id).toBeTruthy()
      expect(account.email).toBe(addAccount.email)
      expect(account.name).toBe(addAccount.name)
      expect(account.password).toBe(addAccount.password)
    })
  })

  describe('loadByEmail()', () => {
    test('Should return an account on success', async () => {
      const sut = makeSut()
      const addAccount = makeAddAccount()
      await accountCollection.insertOne(addAccount)
      const account = await sut.loadByEmail(addAccount.email)
      expect(account.id).toBeTruthy()
      expect(account.name).toBe(addAccount.name)
      expect(account.email).toBe(addAccount.email)
      expect(account.password).toBe(addAccount.password)
    })
  })

  describe('updateAccessToken()', () => {
    test('Should update the account on success', async () => {
      const sut = makeSut()
      const addAccount = makeAddAccount()
      const token = faker.random.uuid()
      const [account] = (await accountCollection.insertOne(addAccount)).ops
      expect(account.accessToken).toBeFalsy()
      await sut.updateAccessToken(account._id, token)
      const updatedAccount = await accountCollection.findOne({ _id: account._id })
      expect(updatedAccount.accessToken).toBe(token)
    })
  })

  describe('loadByToken()', () => {
    test('Should return an account on success', async () => {
      const sut = makeSut()
      const addAccount = {
        ...makeAddAccount(),
        accessToken: faker.random.uuid()
      }
      await accountCollection.insertOne(addAccount)
      const account = await sut.loadByToken(addAccount.accessToken)
      expect(account.id).toBeTruthy()
      expect(account.name).toBe(addAccount.name)
      expect(account.email).toBe(addAccount.email)
      expect(account.password).toBe(addAccount.password)
    })
  })
})
