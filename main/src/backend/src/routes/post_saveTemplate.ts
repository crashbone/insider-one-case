import express, { Request, Response } from 'express'

const router = express.Router()

router.post('/', (req: Request, res: Response) => {
  const { template } = req.body
  
  res.json({
    message: 'Template saved successfully',
    data: {
      id: Date.now(),
      template
    }
  })
})

export default router
