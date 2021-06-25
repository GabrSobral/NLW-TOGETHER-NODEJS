import 'reflect-metadata'
import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import helmet from 'helmet'

import { router } from './routes'

import './database'
import { ErrorCatch } from './middlewares/ErrorCatch'

const app = express()
const PORT = process.env.PORT || 3333
 
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(router)
app.use(ErrorCatch)

app.listen(PORT, () => console.log(`Server's running on http://localhost:${PORT}`))

//Extra features to add: