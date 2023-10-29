const express = require('express')
const router = express.Router()
const path = require('path')
const Post = require('../models/Post')
const app = express()


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

router.get('/new', (req, res) => {
    if (req.session.userId) {
        res.render('addpost.ejs')
    }else{
        res.render('login.ejs')
    }
})

router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(posts => {
            res.render('post.ejs', { posts: posts })
        })
})

router.post('/test', (req, res) => {

    const post_image = req.files.post_image
    post_image.mv(path.resolve(__dirname, '../public/img/mv_img', post_image.name))

    Post.create({
        title: req.body.title,
        content: req.body.content,
        post_image: `/img/mv_img/${post_image.name}`
    }).then(() => {
        console.log('Post Ekleme Başarılı')
        res.redirect('/blog')
    }).catch(error => {
        console.log(error)
    })


})

module.exports = router;