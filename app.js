require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT
const hostname = process.env.HOSTNAME
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const session = require('express-session')
const MongoStore = require('connect-mongo');




mongoose.connect(process.env.DB_URL)
  .then(() => console.log('Connected!'));

  app.use(fileUpload())

  app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL })
    
  }))


app.use(express.static('public'))


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// LoginControl
app.use((req,res,next)=>{
  const {userId} = req.session
  if(userId){
    res.locals={
       hideLogin : true
    }
  }else{
    res.locals={
      hideLogin:false
    }
  }
  next()
})

const mainRouter = require('./routes/main')
const postRouter = require('./routes/post')
const userRouter = require('./routes/users')
app.use('/',mainRouter)
app.use('/posts',postRouter)
app.use('/users',userRouter)









app.listen(port, hostname, () => {
    console.log('Server dinlemede...')
})
