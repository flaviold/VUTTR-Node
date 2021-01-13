import { DbAddTool } from '@/data/usecases/db-add-tool'
import { AddToolModel } from '@/domain/usecases'
import { AddToolRepositorySpy } from '@/tests/data/mocks/mock-db-tool'

const makeAddTool = (): AddToolModel => ({
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
})

interface SutTypes {
  sut: DbAddTool
  addToolRepositorySpy: AddToolRepositorySpy
}

const makeSut = (): SutTypes => {
  const addToolRepositorySpy = new AddToolRepositorySpy()
  const sut = new DbAddTool(addToolRepositorySpy)
  return {
    sut,
    addToolRepositorySpy
  }
}

describe('DbAddTool', () => {
  test('Should call AddToolRepository with correct values', async () => {
    const { sut, addToolRepositorySpy } = makeSut()
    const tool = makeAddTool()
    await sut.add(tool)
    expect(addToolRepositorySpy.toolData).toEqual(tool)
  })
})
