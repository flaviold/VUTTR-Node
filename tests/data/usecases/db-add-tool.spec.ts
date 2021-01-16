import { DbAddTool } from '@/data/usecases'
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

  test('Should throw if AddToolRepository throws', async () => {
    const { sut, addToolRepositorySpy } = makeSut()
    jest.spyOn(addToolRepositorySpy, 'add').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.add(makeAddTool())
    await expect(promise).rejects.toThrow()
  })

  test('Should return the added tool on success', async () => {
    const { sut } = makeSut()
    const addTool = makeAddTool()
    const tool = await sut.add(addTool)
    expect(tool.id).toBeTruthy()
    expect(tool.title).toBe(addTool.title)
    expect(tool.link).toBe(addTool.link)
    expect(tool.description).toBe(addTool.description)
    expect(tool.tags).toEqual(addTool.tags)
  })
})
