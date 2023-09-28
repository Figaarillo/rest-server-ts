import passport from 'passport'
import { HttpResponse } from '../response/http.response'
import { type NextFunction, type Request, type Response } from 'express'
import type UserEntity from '../../user/entities/user.entity'
import { RoleType } from '../../user/dtos/user.dto'

class SharedMiddleware {
  httpResponse: HttpResponse

  constructor() {
    this.httpResponse = new HttpResponse()
  }

  passAuth(type: string): any {
    return passport.authenticate(type, { session: false })
  }

  checkAdminRole(
    req: Request,
    res: Response,
    next: NextFunction
  ): Response<void> | undefined {
    const user = req.user as UserEntity

    if (user.role !== RoleType.ADMIN) {
      return this.httpResponse.Unauthorized(res, 'Unauthorized')
    }

    next()
  }
}

export default SharedMiddleware
