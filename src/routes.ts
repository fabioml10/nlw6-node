import { Router } from 'express'
import { CreateUserController } from './controllers/CreateUserController'
import { CreateTagController } from './controllers/CreateTagController'
import { ensureAdmin } from './middlewares/ensureAdmin'
import { ensureAuth } from './middlewares/ensureAuth'
import { AuthUserController } from './controllers/AuthUserController'
import { CreateComplimentController } from './controllers/CreateComplimentController'
import { ListUserReceiveComplimentsController } from './controllers/ListUserReceiveComplimentsController'
import { ListUserSendComplimentsController } from './controllers/ListUserSendComplimentsController'
import { ListTagsController } from './controllers/ListTagController.ts'
import { ListUserController } from './controllers/ListUserController'

const router = Router()
const createUserController = new CreateUserController()
const createTagController = new CreateTagController()
const authUserController = new AuthUserController()
const createComplimentController = new CreateComplimentController()
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController()
const listUserSendComplimentsController = new ListUserSendComplimentsController()
const listTagsController = new ListTagsController()
const listUsersController = new ListUserController()

router.post('/users', createUserController.handle)
router.get('/users', ensureAuth, listUsersController.handle)
router.post('/tags', ensureAuth, ensureAdmin, createTagController.handle)
router.get('/tags', ensureAuth, listTagsController.handle)
router.post('/login', authUserController.handle)
router.post('/compliments', ensureAuth, createComplimentController.handle)
router.get('/users/compliments/receive', ensureAuth, listUserReceiveComplimentsController.handle)
router.get('/users/compliments/send', ensureAuth, listUserSendComplimentsController.handle)

export { router }
