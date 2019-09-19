const User = require('../database/models/User')
 
module.exports = async (req, res) => {
    try{
       
    const user = await User.findById(req.session.userId);
    //console.log(user);
    res.render("index", {
        posts : user.favourite_posts
    });
}
catch(error){
    console.log('error');
}
}