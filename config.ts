import * as dotenv from 'dotenv'

const options = {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  mongoURL: process.env.MONGO_URL,
}
