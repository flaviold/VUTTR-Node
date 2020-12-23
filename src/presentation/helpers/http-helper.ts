import { HttpResponse } from '@/presentation/protocols'

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null
})

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: null
})
