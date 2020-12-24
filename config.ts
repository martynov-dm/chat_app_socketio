import * as dotenv from 'dotenv'

dotenv.config()

const options = {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  mongoURL: process.env.MONGO_URL,
}

export default options
