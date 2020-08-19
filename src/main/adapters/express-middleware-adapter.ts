import { HttpRequest, Middleware } from '../../presentation/protocols'
import { Request, Response, NextFunction } from 'express'

export const adaptMiddleware = (middleware: Middleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest: HttpRequest = {
      headers: req.headers
    }
    const httpREsponse = await middleware.handle(httpRequest)
    if (httpREsponse.statusCode === 200) {
      Object.assign(req, httpREsponse.body)
      next()
    } else {
      res.status(httpREsponse.statusCode).json({
        error: httpREsponse.body.message
      })
    }
  }
}
