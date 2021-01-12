import { AddToolController } from '@/presentation/controllers/add-tool-controller'
import { badRequest } from '@/presentation/helpers'
import { HttpRequest } from '@/presentation/protocols'
import { AddToolSpy, ValidationSpy } from '@/tests/presentation/mocks'

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
  validationSpy: ValidationSpy
  addToolSpy: AddToolSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const addToolSpy = new AddToolSpy()
  const sut = new AddToolController(validationSpy, addToolSpy)
  return {
    sut,
    validationSpy,
    addToolSpy
  }
}

describe('AddTool Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    await sut.handle(makeRequest())
    expect(validationSpy.input).toEqual(makeRequest().body)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new Error()
    const httpResponse = await sut.handle(makeRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call AddTool with correct values', async () => {
    const { sut, addToolSpy } = makeSut()
    await sut.handle(makeRequest())
    expect(addToolSpy.tool).toEqual(makeRequest().body)
  })
})
