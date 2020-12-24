import * as dotenv from 'dotenv'

dotenv.config()

const options = {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  mongoURL: process.env.MONGO_URL,
  cloudName: process.env.CLOUD_NAME,
  cloudApiKey: process.env.API_KEY,
  cloudApiSecret: process.env.API_SECRET,
}

export default options
