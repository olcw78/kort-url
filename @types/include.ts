import { NextFunction, Request } from 'express'

export type MiddlewareFn = (
  req: Request,
  res: Response,
  next: NextFunction
) => void | ReturnType<NextFunction>
