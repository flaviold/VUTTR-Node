import { DbLoadTools } from '@/data/usecases/db-load-tools'
import { LoadToolByTagsRepositorySpy, LoadToolsRepositorySpy } from '@/tests/data/mocks/mock-db-tool'

interface SutTypes {
  sut: DbLoadTools
  loadToolsRepositorySpy: LoadToolsRepositorySpy
  loadToolByTagsRepositorySpy: LoadToolByTagsRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadToolsRepositorySpy = new LoadToolsRepositorySpy()
  const loadToolByTagsRepositorySpy = new LoadToolByTagsRepositorySpy()
  const sut = new DbLoadTools(loadToolsRepositorySpy, loadToolByTagsRepositorySpy)
  return {
    sut,
    loadToolsRepositorySpy,
    loadToolByTagsRepositorySpy
  }
}

describe('DbLoadTools', () => {
  test('Should call LoadToolsRepository if no tag is provided', async () => {
    const { sut, loadToolsRepositorySpy } = makeSut()
    const loadSpy = jest.spyOn(loadToolsRepositorySpy, 'load')
    await sut.load()
    expect(loadSpy).toHaveBeenCalledTimes(1)
  })

  test('Should not call LoadToolsRepository if tag is provided', async () => {
    const { sut, loadToolsRepositorySpy } = makeSut()
    const loadSpy = jest.spyOn(loadToolsRepositorySpy, 'load')
    await sut.load('any_tag')
    expect(loadSpy).toHaveBeenCalledTimes(0)
  })

  test('Should call LoadToolByTagsRepository if tag is provided', async () => {
    const { sut, loadToolByTagsRepositorySpy } = makeSut()
    const loadByTagsSpy = jest.spyOn(loadToolByTagsRepositorySpy, 'loadByTags')
    await sut.load('any_tag')
    expect(loadByTagsSpy).toHaveBeenCalledTimes(1)
  })

  test('Should not call LoadToolByTagsRepository if no tag is provided', async () => {
    const { sut, loadToolByTagsRepositorySpy } = makeSut()
    const loadByTagsSpy = jest.spyOn(loadToolByTagsRepositorySpy, 'loadByTags')
    await sut.load()
    expect(loadByTagsSpy).toHaveBeenCalledTimes(0)
  })

  test('Should call LoadToolByTagsRepository with correct tags', async () => {
    const { sut, loadToolByTagsRepositorySpy } = makeSut()
    const loadByTagsSpy = jest.spyOn(loadToolByTagsRepositorySpy, 'loadByTags')
    await sut.load('any_tag')
    expect(loadByTagsSpy).toHaveBeenCalledWith(['any_tag'])
    await sut.load(['any_tag'])
    expect(loadByTagsSpy).toHaveBeenCalledWith(['any_tag'])
  })

  test('Should return a list of tools on success', async () => {
    const { sut, loadToolsRepositorySpy, loadToolByTagsRepositorySpy } = makeSut()
    let tools = await sut.load()
    expect(tools).toBe(loadToolsRepositorySpy.result)
    tools = await sut.load('any_tag')
    expect(tools).toBe(loadToolByTagsRepositorySpy.result)
  })
})
