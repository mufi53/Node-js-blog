const User = require('../database/models/User');



module.exports = async (req, res) => {
    try{
    const users = await User.find({});
    res.render("points", {
        users
    });
}
catch(error){
    console.log('error');
}
}