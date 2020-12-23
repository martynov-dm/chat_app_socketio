import mongoose from 'mongoose'

mongoose.connection.on('connected', (err) => {
  console.log(`can not connect to db ${err}`)
  process.exit(1)
})
