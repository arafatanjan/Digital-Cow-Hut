import express, {Application, Request, Response} from 'express';
const app: Application = express()
import cors from 'cors'
import usersRouter from './app/modules/user/users.route'
import cowRouter from './app/modules/cow/cow.route'
// const port = 3000

app.use(cors())

//parsar
app.use(express.json());
// app.use(express.urlencoded)

app.use('/api/v1/', usersRouter)
app.use('/api/v1/cows', cowRouter)


app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})

export default app;
