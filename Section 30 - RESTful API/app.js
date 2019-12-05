const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();
mongoose.connect('mongodb://localhost/wikiDB', { useNewUrlParser: true, useUnifiedTopology: true });

const articleSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Article = mongoose.model("Article", articleSchema);

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.route("/articles")
    .get((req, res) => {
        Article.find((err, foundArticles) => {
            if (err) {
                res.send(err);
            } else {
                res.send(foundArticles);
            }
        });
    })

    .post((req, res) => {
        const postTitle = req.body.title;
        const postContent = req.body.content;

        const newArticle = new Article({
            title: postTitle,
            content: postContent
        });

        newArticle.save((err) => {
            if (!err) {
                res.send("Successfully added a new article.");
            } else {
                res.send(err);
            }
        });
    })

    .delete((req, res) => {
        Article.deleteMany({},
            (err) => {
                if (!err) {
                    res.send("All articles successfully removed.");
                } else {
                    res.send(err);
                }
            });
    });



app.route("/articles/:articleTitle")
    .get((req, res) => {
        const title = req.params.articleTitle;
        Article.findOne({ title: title },
            (err, foundArticle) => {
                if (!err) {
                    res.send(foundArticle);
                } else {
                    res.send(err);
                }
            });
    })

    .put((req, res) => {
        Article.updateOne({ title: req.params.articleTitle },
            {
                title: req.body.title,
                content: req.body.content
            },
            { overwrite: true },
            (err) => {
                if (!err) {
                    res.send("Successfully updated article.");
                } else {
                    res.send(err);
                }
            })
    })

    .patch((req, res) => {

        Article.updateOne({ title: req.params.articleTitle },
            req.body,
            (err) => {
                if (!err) {
                    res.send("Successfully updated article.");
                } else {
                    res.send(err);
                }
            });
    })

    .delete((req, res) => {
        Article.deleteOne({ title: req.params.articleTitle },
            (err) => {
                if (!err) {
                    res.send("Deleted article sucessfully.");
                } else {
                    res.send(err);
                }
            });
    });

app.listen(3000, () => {
    console.log("Server started on port 3000");
});