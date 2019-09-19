const mongoose = require('mongoose');
 
const PostSchema = new mongoose.Schema({
    title:  String, 
    description: String,
    username: String,
    video:String,
    image: String,
    createdAt: {
        type: Date,
        default: new Date()
    }

});

PostSchema.index( { title:"text", description: "text" } );
const Post = mongoose.model('Post', PostSchema);
 
module.exports = Post;