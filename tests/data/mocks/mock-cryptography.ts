import faker from 'faker'
import { HashComparer, Hasher } from '@/data/protocols'

export class HasherSpy implements Hasher {
  value: string
  result: string = faker.random.uuid()

  async hash (value: string): Promise<string> {
    this.value = value
    return this.result
  }
}

export class HashComparerSpy implements HashComparer {
  value: string
  hash: string
  result: boolean = true

  async compare (value: string, hash: string): Promise<boolean> {
    this.value = value
    this.hash = hash

    return this.result
  }
}
