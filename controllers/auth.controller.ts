import express from 'express'

export const registerController = async (
  req: express.Request,
  res: express.Response
) => {
  console.log(req.files)
}
