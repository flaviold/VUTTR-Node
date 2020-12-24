import { DbLoadTools } from '@/data/usecases/db-load-tools'
import { LoadToolsRepositorySpy } from '@/tests/data/mocks/mock-db-tool'

interface SutTypes {
  sut: DbLoadTools
  loadToolsRepository: LoadToolsRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadToolsRepository = new LoadToolsRepositorySpy()
  const sut = new DbLoadTools(loadToolsRepository)
  return {
    sut,
    loadToolsRepository
  }
}

describe('DbLoadTools', () => {
  test('Should call LoadToolsRepository if no tag is provided', async () => {
    const { sut, loadToolsRepository } = makeSut()
    const loadSpy = jest.spyOn(loadToolsRepository, 'load')
    await sut.load()
    expect(loadSpy).toHaveBeenCalledTimes(1)
  })

  test('Should not call LoadToolsRepository if tag is provided', async () => {
    const { sut, loadToolsRepository } = makeSut()
    const loadSpy = jest.spyOn(loadToolsRepository, 'load')
    await sut.load('any_tag')
    expect(loadSpy).toHaveBeenCalledTimes(0)
  })
})
