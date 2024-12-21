import express from 'express';
import userrouter from '../modules/user/users.route';
import cowrouter from '../modules/cow/cow.route';
import orderrouter from '../modules/order/order.route';

const router = express.Router();


const moduleRoutes = [
    {
      path: '/users',
      route: userrouter,
    },
    {
      path: '/cow',
      route: cowrouter,
    },
    {
      path: '/order',
      route: orderrouter,
    }
]