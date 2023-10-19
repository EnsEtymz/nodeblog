const express = require('express')
const app = express()
const router = express.Router()
const path = require('path')
const Post = require('../models/Post')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

router.get('/', (req, res) => {
    res.render('index.ejs')
    console.log(req.session)
})

router.get('/index', (req, res) => {
    res.render('index.ejs')
})


router.get('/about', (req, res) => {
    res.render('about.ejs')
})

router.get('/blog', (req, res) => {
    Post.find({})
    .then(posts=>res.render('blog.ejs',{posts:posts}))
})

router.get('/blog-single', (req, res) => {
    res.render('blog-single.ejs')
})

router.get('/contact', (req, res) => {
    res.render('contact.ejs')
})







module.exports= router;