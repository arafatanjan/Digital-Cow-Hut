import express from 'express'
import ordererController from './order.controller'
const router = express.Router()

router.post('/api/v1/orders', ordererController.createOrder)
router.get('/api/v1/orders', ordererController.createOrder)


export default router


export const UserRoutes = router;