import { DbRemoveTool } from '@/data/usecases'
import { RemoveToolRepositorySpy } from '@/tests/data/mocks/mock-db-tool'

import faker from 'faker'

interface SutTypes {
  sut: DbRemoveTool
  removeToolRepositorySpy: RemoveToolRepositorySpy
}

const makeSut = (): SutTypes => {
  const removeToolRepositorySpy = new RemoveToolRepositorySpy()
  const sut = new DbRemoveTool(removeToolRepositorySpy)
  return {
    sut,
    removeToolRepositorySpy
  }
}

describe('DbRemoveTool', () => {
  test('Should call RemoveToolRepository with correct id', async () => {
    const { sut, removeToolRepositorySpy } = makeSut()
    const id = faker.random.uuid()
    await sut.remove(id)
    expect(removeToolRepositorySpy.id).toBe(id)
  })
})
