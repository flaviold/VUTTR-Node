import { ToolModel } from '@/domain/models/tool'

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
