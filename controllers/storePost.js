const path = require('path')
const Post = require('../database/models/Post')
const User = require('../database/models/User')



module.exports = async (req, res) => {
    const user = await User.findById(req.session.userId);
    var user_points = user.points ;
    console.log(user_points , 'points');
    
    if(!req.body.video && !req.files){
        req.session.points = user_points + 1 ;

    }
    if(req.body.video){
        var new_url = req.body.video.replace("watch?v=", "embed/");
        req.body.video = new_url;
        req.session.points = user_points + 5 ;

    }
    if(req.files){
        req.session.points = user_points + 2;
        const {
            image
        } = req.files
     
        image.mv(path.resolve(__dirname, 'public/posts', image.name), (error) => {
            Post.create({
                ...req.body,
                image: `/posts/${image.name}`
            }, (error, post) => {
                res.redirect('/');
            });
        })

    }
    else{
       
        Post.create(req.body, (error, post) => {
            console.log(req.body);
            res.redirect('/')
        })
       await User.findByIdAndUpdate(req.session.userId,{$set:{points:req.session.points}},{new:true})    ;

    }
  
};
