import { Controller, HttpRequest } from '../../presentation/protocols'
import { Request, Response } from 'express'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    const httpREsponse = await controller.handle(httpRequest)
    res.status(httpREsponse.statusCode).json(httpREsponse.body)
  }
}
