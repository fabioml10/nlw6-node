import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

interface IPayload {
  sub: string;
}

export function ensureAuth(req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers.authorization

  if (!authToken) {
    return res.status(401).end()
  }

  try {
    const [, token] = authToken.split(' ')
    const { sub } = verify(token, "dd5daef1fbff759dd119d0ebf2438ae6") as IPayload

    req.user_id = sub

    return next()
  } catch (err) {
    return res.status(401).end()
  }
}
