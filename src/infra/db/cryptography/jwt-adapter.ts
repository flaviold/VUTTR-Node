import { Encrypter } from '@/data/protocols'

import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter {
  constructor (
    private readonly secret: string
  ) {}

  async encrypt (payload: any): Promise<string> {
    return await jwt.sign(payload, this.secret)
  }
}
