import { LoadToolsController } from '@/presentation/controllers/load-tools-controller'
import { noContent, ok } from '@/presentation/helpers'
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

  test('Should return 200 if LoadTools returns a list of tools', async () => {
    const { sut, loadToolsSpy } = makeSut()
    const httpResponse = await sut.handle(makeRequest())
    expect(httpResponse).toEqual(ok(loadToolsSpy.result))
  })

  test('Should return 204 if LoadTools returns an empty list', async () => {
    const { sut, loadToolsSpy } = makeSut()
    loadToolsSpy.result = []
    const httpResponse = await sut.handle(makeRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
