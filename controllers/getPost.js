const Post = require('../database/models/Post')
 
module.exports = async (req, res) => {
    try{
    const post = await Post.findById(req.params.id);
    res.render("post", {
        post
    });
}
catch(error){
    console.log('error');
}
}