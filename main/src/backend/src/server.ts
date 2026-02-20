import express from 'express'
import get_initialData from './routes/get_initialData.ts'
import post_saveTemplate from './routes/post_saveTemplate.ts'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.use('/api/get_initialData', get_initialData)
app.use('/api/post_saveTemplate', post_saveTemplate)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export default app
