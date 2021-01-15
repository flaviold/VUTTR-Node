import { ToolModel } from '@/domain/models/tool'
import { AddToolModel } from '../usecases'

import faker from 'faker'

export const makeTool = (): ToolModel => ({
  id: faker.random.uuid(),
  title: faker.random.word(),
  link: faker.internet.url(),
  description: faker.random.words(),
  tags: [
    faker.random.word(),
    faker.random.word(),
    faker.random.word()
  ]
})

export const makeAddTool = (): AddToolModel => ({
  title: faker.random.word(),
  link: faker.internet.url(),
  description: faker.random.words(),
  tags: [
    faker.random.word(),
    faker.random.word(),
    faker.random.word()
  ]
})

export const makeTools = (): ToolModel[] => [
  makeTool(),
  makeTool(),
  makeTool(),
  makeTool(),
  makeTool()
]

export const addTools = [
  makeAddTool(),
  makeAddTool(),
  makeAddTool()
]
