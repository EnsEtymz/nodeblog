const mongoose = require('mongoose')
const Schema = mongoose.Schema


const PostSchema = new Schema({
  
    title: {type: String , require:true},
    content : {type: String, require:true},
    date: {type:Date , default:Date.now},
    post_image: {type:String, require:true}
    
})

module.exports = mongoose.model('Post', PostSchema)