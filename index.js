const path = require('path');
const express = require('express');
const expressEdge = require('express-edge');
const edge = require("edge.js");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Post = require('./database/models/Post');
const fileUpload = require("express-fileupload");
const expressSession = require('express-session');
const connectMongo = require('connect-mongo');
const mongoStore = connectMongo(expressSession);
const auth = require("./middleware/auth");
const connectFlash = require("connect-flash");




const createPostController = require('./controllers/createPost')
const addFavourite_postController = require('./controllers/addFavourite');
const showFavourite_postController = require('./controllers/showFavourite');
const getPointsController = require('./controllers/getPoints')
const searchPostController = require('./controllers/searchPost')
const homePageController = require('./controllers/homePage')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const createUserController = require("./controllers/createUser");
const storeUserController = require('./controllers/storeUser');
const loginController = require("./controllers/login");
const loginUserController = require('./controllers/loginUser');
const redirectIfAuthenticated = require('./middleware/redirectIfAuthenticated');
const logoutController = require("./controllers/logout");

 


mongoose.connect('mongodb://localhost:27017/node-blog', { useNewUrlParser: true })
    .then(() => 'You are now connected to Mongo!')
    .catch(err => console.error('Something went wrong', err))


 
const app = new express();
app.use(expressSession({
    secret: 'secret',
   
}));
app.use(connectFlash());
app.use(express.static('public'));
app.use(fileUpload());
app.use(expressEdge);
app.set('views', __dirname + '/views');
app.use('*', (req, res, next) => {
    edge.global('auth', req.session.userId)
    next()
});
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));
const storePost = require('./middleware/storePost')
app.use('/posts/store', storePost)


app.get("/", homePageController);
app.get("/favourite", auth, addFavourite_postController);
app.get("/user_favourite", auth, showFavourite_postController);
app.get("/points", auth , getPointsController);
app.post("/search",  searchPostController );
app.get("/post/:id", getPostController);
app.get("/posts-new", auth, createPostController);
app.post("/posts/store",  auth, storePostController);
app.get("/auth/register", redirectIfAuthenticated, createUserController);
app.post("/users/register", redirectIfAuthenticated,storeUserController);
app.get('/auth/login', redirectIfAuthenticated, loginController);
app.post('/users/login', redirectIfAuthenticated, loginUserController);
app.get("/auth/logout",  logoutController);

 



 

 
app.listen(3000, () => {
    console.log('App listening on port 3000')
});

