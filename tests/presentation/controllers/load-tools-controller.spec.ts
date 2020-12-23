import { LoadToolsController } from '@/presentation/controllers/load-tools-controller'
import { HttpRequest } from '@/presentation/protocols'
import { LoadToolsSpy } from '@/tests/presentation/mocks/mock-tool'

const makeRequest = (): HttpRequest => ({
  query: {
    tag: ['any_tag']
  }
})

interface SutTypes {
  sut: LoadToolsController
  loadToolsSpy: LoadToolsSpy
}

const makeSut = (): SutTypes => {
  const loadToolsSpy = new LoadToolsSpy()
  const sut = new LoadToolsController(loadToolsSpy)
  return {
    sut,
    loadToolsSpy
  }
}

describe('LoadTools Controller', () => {
  test('Should call LoadTools with correct values', async () => {
    const { sut, loadToolsSpy } = makeSut()
    await sut.handle(makeRequest())
    expect(loadToolsSpy.tag).toEqual(['any_tag'])
  })
})
