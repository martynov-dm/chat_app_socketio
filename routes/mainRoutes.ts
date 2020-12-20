import express from 'express'

const mainRouter = express.Router()

mainRouter.get('/', (req, res) => {
  res.send('server is up and running!')
})

export default mainRouter
