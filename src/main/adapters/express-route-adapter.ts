import { Controller, HttpRequest } from '../../presentation/protocols'
import { Request, Response } from 'express'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    const httpREsponse = await controller.handle(httpRequest)
    if (httpREsponse.statusCode >= 200 && httpREsponse.statusCode <= 299) {
      res.status(httpREsponse.statusCode).json(httpREsponse.body)
    } else {
      res.status(httpREsponse.statusCode).json({
        error: httpREsponse.body.message
      })
    }
  }
}
