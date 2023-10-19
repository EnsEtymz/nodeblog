const express = require('express')
const router = express.Router()
const User = require('../models/User')


router.get('/register', (req,res)=>{
    res.render('register.ejs')
})

router.post('/register',(req,res)=>{
    User.create(req.body)
    .then(res.redirect('/users/login'))
   
})


/*------------------------------------------*/


router.get('/login',(req,res)=>{
    res.render('login.ejs')
})

router.post('/login', (req,res)=>{
  const {email, password} = req.body

  User.findOne({
    email:email,
    password:password
  }).then(user=>{

if(user){
    req.session.userId = user._id
    console.log('Giriş Başarılı')
    res.redirect('/')
}else{
    console.log('Kullanıcı Yok!')
    res.render('login.ejs')
}
}).catch(error=>console.log(error))
})


router.get('/logout',(req,res)=>{
    req.session.destroy(()=>{
res.redirect('/')
    })
    
   
  
})

module.exports = router