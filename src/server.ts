import 'reflect-metadata'
import express from 'express'
import 'express-async-errors'

import { router } from './routes'

import './database'
import { ErrorCatch } from './middlewares/ErrorCatch'

const app = express()
const PORT = process.env.PORT || 3333
 
app.use(express.json())
app.use(router)
app.use(ErrorCatch)

app.listen(PORT, () => console.log(`Server's running on http://localhost:${PORT}`))