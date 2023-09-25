import { HttpResponse } from '../../shared/response/http.response'
import type UserEntity from '../../user/entities/user.entity'
import AuthService from '../services/auth.service'
import { type Request, type Response } from 'express'

class AuthController extends AuthService {
  private readonly httpResponse: HttpResponse
  constructor() {
    super()
    this.httpResponse = new HttpResponse()
  }

  async login(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>> | undefined> {
    try {
      const userEncode = req.user as UserEntity

      const encode = await this.generateJWT(userEncode)

      if (encode == null) {
        return this.httpResponse.BadRequest(res, 'Unauthorized')
      }

      res.header('Content-Type', 'application/json')
      res.cookie('access-token', encode.accessToken, { maxAge: 60000 * 60 })
      res.write(JSON.stringify(encode))
      res.end()
    } catch (error) {
      return this.httpResponse.BadRequest(res, error)
    }
  }
}

export default AuthController
