import { Request, Response } from 'express'
import { ListUserService } from '../services/ListUserService'

class ListUserController {
  async handle(req: Request, res: Response) {
    const createUserService = new ListUserService
    const users = await createUserService.execute()

    return res.json(users)
  }
}

export { ListUserController }
