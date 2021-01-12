import { AddToolController } from '@/presentation/controllers/add-tool-controller'
import { HttpRequest } from '@/presentation/protocols'
import { AddToolSpy } from '@/tests/presentation/mocks/mock-tool'

const makeRequest = (): HttpRequest => ({
  body: {
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
  }
})

interface SutTypes {
  sut: AddToolController
  addToolSpy: AddToolSpy
}

const makeSut = (): SutTypes => {
  const addToolSpy = new AddToolSpy()
  const sut = new AddToolController(addToolSpy)
  return {
    sut,
    addToolSpy
  }
}

describe('AddTool Controller', () => {
  test('Should call AddTool with correct values', async () => {
    const { sut, addToolSpy } = makeSut()
    await sut.handle(makeRequest())
    expect(addToolSpy.tool).toEqual(makeRequest().body)
  })
})
