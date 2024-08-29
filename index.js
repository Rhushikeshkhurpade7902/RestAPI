const express=require("express");

const app=express();
const port=8080;
const path=require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride=require("method-override")


app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.set("views engine","ejs");
app.set("views",path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts=[
    {
        id:uuidv4(),
        username: "apnacollege",
        content: "i love coding! ",
    },
    {id:uuidv4(),
        username: "Shrdhdhakapra",
        content: "Hardwork is key to success!!",
    },
    {id:uuidv4(),
        username: "Rhushikeshkhurpade",
        content: "Believe on gods plan!!!",
    },
];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{ posts });
});

app.get("/post/new",(req,res)=>{
    res.render("new.ejs")
});

app.post("/posts",(req,res)=>{
    let { username,content } = req.body;
    let id = uuidv4();
    posts.push({id ,username,content});
    res.redirect("/posts");
});
app.get("/post/:id",(req,res)=>{
    let { id }=req.params;
    let post = posts.find((p) =>id===p.id);
    console.log(post);
    res.render("show.ejs",{ post })
});
app.patch("/post/:id",(req,res)=>{
    let {id}=req.params;
    let NewContent=req.body.content;
    let post = posts.find((p) =>id===p.id);
    post.content=NewContent;
    res.redirect("/posts");
});
app.get("/post/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post = posts.find((p) =>id===p.id);
    res.render("edit.ejs");

});
app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=>id!==p.id);
    res.redirect("/posts");
});
app.listen(port ,()=>{
    console.log("listening to the port  :8080 ")
});