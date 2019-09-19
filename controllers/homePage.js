const Post = require('../database/models/Post');

 
module.exports = async (req, res) => {
    var page = parseInt(req.query.page);
    var limit = 10;
    var skip = limit * (page - 1);
    var post_count = await Post.count({});
    var total_pages;
    var pages = [];

    if(post_count/limit >= 1){
        total_pages = Math.ceil(post_count/limit);
     }

     else {
         total_pages = 1 ;
     }
     for(i=1;  i<=total_pages; i++){
         pages.push(i);

     }

     console.log(post_count , pages);
    
    


  
    const posts = await Post.find({}).sort({_id:-1}).limit(limit).skip(skip);
 
    res.render("index", {
        posts:posts,
        total_pages :pages,
        current_page : page
    });
}