import { Router } from 'express'
import { AuthenticateUserController } from './controllers/AuthenticateUserController'
import { CreateComplimentController } from './controllers/CreateComplimentController'
import { CreateTagController } from './controllers/CreateTagController'
import { CreateUserController } from './controllers/CreateUserController'
import { ListTagsController } from './controllers/ListTagsController'
import { ListUserController } from './controllers/ListUserControler'
import { ListUserReceivedComplimentsController } from './controllers/ListUserReceiverComplimentsController'
import { ListUserSenderComplimentsController } from './controllers/ListUserSenderComplimentsController'

import { ensureAdmin } from './middlewares/ensureAdmin'
import { ensureAuthenticated } from './middlewares/ensureAuthenticated'

const router = Router()

// users
const createUserController = new CreateUserController()
const authenticateUserController = new AuthenticateUserController()
const listUsersController = new ListUserController()

//compliments
const createComplimentController = new CreateComplimentController()
const listUserReceivedComplimentsController = new ListUserReceivedComplimentsController()
const listUserSenderComplimentsController = new ListUserSenderComplimentsController()

//tags
const createTagController = new CreateTagController()
const listTagsController = new ListTagsController()


router.post(
  "/users", //route
  createUserController.handle //controller
)

router.post(
  '/tags', //route
  ensureAuthenticated, //middleware check auth
  ensureAdmin, //middleware check permission
  createTagController.handle //controller
)
router.post(
  '/login', //route
  authenticateUserController.handle //controller
)
router.post(
  '/compliment', //route
  ensureAuthenticated, //middleware check auth
  createComplimentController.handle //controler
)

router.get(
  '/users/compliments/send', //router
  ensureAuthenticated, //middleware check auth
  listUserSenderComplimentsController.handle, //controller
)
router.get(
  '/users/compliments/receive', //route
  ensureAuthenticated, //middleware check auth
  listUserReceivedComplimentsController.handle //controller
)

router.get(
  '/tags', //route
  ensureAuthenticated, //middleware check auth
  listTagsController.handle //controller
)

router.get(
  '/users', //route
  ensureAuthenticated, //middleware check auth
  listUsersController.handle //controller
)

export { router }