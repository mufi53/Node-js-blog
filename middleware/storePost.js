module.exports = (req, res, next) => {
    if (!req.body.username || !req.body.title || !req.body.description ) {
        return res.redirect('/posts-new')
    }
 
    next()
}