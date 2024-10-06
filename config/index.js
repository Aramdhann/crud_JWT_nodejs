import * as dotenv from 'dotenv'
dotenv.config()

const { PORT, URI, SECRET_ACCESS_TOKEN } = process.env

export { PORT, URI, SECRET_ACCESS_TOKEN }
