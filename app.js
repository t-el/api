import express from 'express';
import dotenv from 'dotenv'
dotenv.config()
import bp from 'body-parser'
import db from './database/connection.js'
import  hbs from 'hbs'


import apiRouter from './api/index.js'


const app = express()
const port = process.env.PORT || 3000

app.use('/api', apiRouter)
//import connect from 'connect'
//app.use(connect.bodyParser());

app.set('view engine', 'hbs')
app.set('views', './views')
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index',{hostname:req.hostname})
})



app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})
