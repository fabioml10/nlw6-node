import { Router } from 'express'
import { CreateUserController } from './controllers/CreateUserController'
import { CreateTagController } from './controllers/CreateTagController'
import { ensureAdmin } from './middlewares/ensureAdmin'
import { AuthUserController } from './controllers/AuthUserController'
import { CreateComplimentController } from './controllers/CreateComplimentController'

const router = Router()
const createUserController = new CreateUserController()
const createTagController = new CreateTagController()
const authUserController = new AuthUserController()
const createComplimentController = new CreateComplimentController()

router.post('/users', createUserController.handle)
router.post('/tags', ensureAdmin, createTagController.handle)
router.post('/login', authUserController.handle)
router.post('/compliments', createComplimentController.handle)

export { router }
