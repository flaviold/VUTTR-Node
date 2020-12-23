import { ToolModel } from '@/domain/models/tool'
import { LoadTools } from '@/domain/usecases/load-tools'

import faker from 'faker'

export const makeTools = (): ToolModel[] => [
  {
    id: faker.random.uuid(),
    title: faker.random.word(),
    link: faker.internet.url(),
    description: faker.random.words(),
    tags: [
      faker.random.word(),
      faker.random.word(),
      faker.random.word(),
      faker.random.word()
    ]
  },
  {
    id: faker.random.uuid(),
    title: faker.random.word(),
    link: faker.internet.url(),
    description: faker.random.words(),
    tags: [
      faker.random.word(),
      faker.random.word()
    ]
  },
  {
    id: faker.random.uuid(),
    title: faker.random.word(),
    link: faker.internet.url(),
    description: faker.random.words(),
    tags: [
      faker.random.word(),
      faker.random.word(),
      faker.random.word()
    ]
  }
]

export class LoadToolsSpy implements LoadTools {
  tag?: string | string[]
  result: ToolModel[] = makeTools()

  async load (tag?: string | string[]): Promise<ToolModel[]> {
    this.tag = tag
    return this.result
  }
}
