import express from 'express'
import usersController from './users.controller'
const router = express.Router()

router.post('auth/signup', usersController.createUser)

router.get('/',usersController.getUsers);
router.get('/:id',usersController.getSingleUser);
router.patch('/:id',usersController.updateSingleUser);
// router.delete('/:id',usersController.deleteUser);

export default router


export const UserRoutes = router;