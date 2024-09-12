import express, { urlencoded } from 'express'
import routes from './routes/index.js'
import dbConnect from './db/connect.js'

const app = express()
dbConnect(); // db connection

app.use(express.json());
app.use(express.urlencoded({ extended: true }))



app.use('/', routes)



app.listen('5000', () => {
    console.log('Listening on port 5000')
})

