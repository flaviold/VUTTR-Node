import faker from 'faker'
import { Hasher } from '@/data/protocols'

export class HasherSpy implements Hasher {
  value: string
  result: string = faker.random.uuid()

  async hash (value: string): Promise<string> {
    this.value = value
    return this.result
  }
}
