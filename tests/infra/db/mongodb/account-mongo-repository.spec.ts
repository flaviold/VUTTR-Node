import { Collection } from 'mongodb'
import { AccountMongoRepository, MongoHelper } from '@/infra/db/mongodb'
import { makeAddAccount } from '@/tests/domain/mocks/mock-account'

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
  })
})
