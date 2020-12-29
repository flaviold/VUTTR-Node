import { ToolModel } from '@/domain/models/tool'

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

export const makeTools = (): ToolModel[] => [
  makeTool(),
  makeTool(),
  makeTool(),
  makeTool(),
  makeTool()
]

export const addTools = [{
  title: 'Notion',
  link: 'https://notion.so',
  description: 'All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized.',
  tags: [
    'organization',
    'planning',
    'collaboration',
    'writing',
    'calendar'
  ]
}, {
  title: 'json-server',
  link: 'https://github.com/typicode/json-server',
  description: 'Fake REST API based on a json schema. Useful for mocking and creating APIs for front-end devs to consume in coding challenges.',
  tags: [
    'api',
    'json',
    'schema',
    'node',
    'github',
    'rest'
  ]
}, {
  title: 'fastify',
  link: 'https://www.fastify.io/',
  description: 'Extremely fast and simple, low-overhead web framework for NodeJS. Supports HTTP2.',
  tags: [
    'web',
    'framework',
    'node',
    'http2',
    'https',
    'localhost'
  ]
}]
