//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const PORT = process.env.PORT || 3000;
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// lo - dash setup
const _ = require('lodash');
const dashify = require('dashify');

let posts = [];
let trunclen = 100;

//+-----------------------------------------------+
//|    HOME PAGE, ABOUT AND CONTACT PAGE ROUTE 
//+-----------------------------------------------+

app.get("/", function(req, res) {
    // res.send("Hello babe")
    // var title = $("h1").text
    res.render("home", {
        HomeEJScontent: homeStartingContent,
        HomeEJS_posts: posts,
        HomeEJS_len: trunclen
    });
    // let day = date.getDay();
    // //render "list.ejs" (foler 'views') and pass the 'day' variable to TypeOfDay inside the list.ejs
    // res.render('list', { listTitle: day, newListItems: items });
});
// app.get("/home", function(req, res) {
//     res.render("home", { HomeEJScontent: homeStartingContent });
// });

// ============= ABOUT PAGE ======================
app.get("/contact", function(req, res) {
    res.render("contact", { contactEJScontent: contactContent });
});

// ============= ABOUT PAGE ======================
app.get("/about", function(req, res) {
    res.render("about", { aboutEJScontent: aboutContent });
});

// ============= COMPOSE PAGE ======================

app.get("/compose", function(req, res) {
    //post back the new todo item
    res.render('compose');
});

// ============= POST PAGE ======================

app.get("/posts/:postName", function(req, res) {
    //post back the new todo item
    const requestedTitle = dashify(_.lowerCase(req.params.postName));

    posts.forEach(function(post) {
        const storedTitle = dashify(_.lowerCase(post._postTitle));
        // console.log("the storedTitle is:" + storedTitle + "\n" +
        //     "the requestedTitle is:" + requestedTitle);
        if (requestedTitle === storedTitle) {

            res.render('post', {
                title: post._postTitle,
                content: post._postBody,
                urltitle: post._postURL
            });
        } else {
            res.render('error');
        }
    });

    // res.redirect('/');
});


// ============= ERROR PAGE ======================
app.get('*', function(req, res) { res.render('error'); });

// redirect to compose.ejs when click new post button
app.post("/", function(req, res) {
    //post back the new todo item
    res.redirect('compose');

});

app.post("/compose", function(req, res) {
    const post = {
        _postTitle: req.body.postTitle,
        _postBody: req.body.postBody,
        _postURL: "posts/" + dashify(_.lowerCase(req.body.postTitle))

    };
    // console.log("the post.postURL is:" + post._postURL);
    //add new title and body to the arrays
    posts.push(post);
    console.log(posts);
    //redirect to home route
    res.redirect("/")
        // if (req.body.list == "Work") {
        //     postTitles.push(_postTitle);
        //     postBodies.push(_postBody);
        //     res.redirect("/work");
        // } else {
        //     items.push(item);
        //     //post back the new todo item
        //     res.redirect('/');
        // }




});


app.listen(3000, function() {
    console.log(`Server started on port ${PORT}... `);
});