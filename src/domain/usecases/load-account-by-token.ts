import { AccountModel } from '@/domain/models/account'

export interface LoadAccountByToken {
  load: (token: string) => Promise<AccountModel>
}
