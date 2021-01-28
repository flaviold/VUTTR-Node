import { AddAccountRepository, LoadAccountByEmailRepository } from '@/data/protocols'
import { AccountModel } from '@/domain/models/account'
import { AddAccountModel } from '@/domain/usecases'
import { MongoHelper } from '@/infra/db/mongodb'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    return MongoHelper.map(result.ops[0])
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })
    return account && MongoHelper.map(account)
  }
}
