import express from 'express'

export const registerController = async (
  req: express.Request,
  res: express.Response
) => {
  res.send('hello world')
}
