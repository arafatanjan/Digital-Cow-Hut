import express from 'express'
import cowController from './cow.controller'
const router = express.Router()

router.post('auth/signup', cowController.createCow)

 router.get('/',cowController.getCows);
 router.get('/:id',cowController.getSingleCow);
 router.patch('/:id',cowController.updateSingleCow);
//  router.delete('/:id',cowController.deleteCow);

export default router


export const UserRoutes = router;