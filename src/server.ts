import 'reflect-metadata'
import express from 'express'
import { router } from './routes'

import './database'

const app = express()
const PORT = process.env.PORT || 3333
 
app.use(express.json())
app.use(router)

app.listen(PORT, () => console.log(`Server's running on http://localhost:${PORT}`))