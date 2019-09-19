const User = require('../database/models/User');
const Post = require('../database/models/Post')
 

module.exports = async (req, res) => {
  
    var post_id = req.query.id;
    const post = await Post.findById(post_id);
   
       console.log('fav' , post_id , post);
       await User.findByIdAndUpdate(req.session.userId,{$push:{favourite_posts:post}},{new:true})    ;

    
  
};
