import { Router } from 'express'
import { CreateUserController } from './controllers/CreateUserController'
import { CreateTagController } from './controllers/CreateTagController'
import { ensureAdmin } from './middlewares/ensureAdmin'
import { AuthUserController } from './controllers/AuthUserController'

const router = Router()
const createUserController = new CreateUserController()
const createTagController = new CreateTagController()
const authUserController = new AuthUserController()

router.post('/users', createUserController.handle)
router.post('/tags', ensureAdmin, createTagController.handle)
router.post('/login', authUserController.handle)

export { router }
