const express =require("express");

const { v4: uuidv4 } = require('uuid');//used fpr creating unique ids
const app=express();
const port=8080;
const path=require("path");

const methodOverride=require("method-override");//both has been used to override since we want to update
app.use(methodOverride("_method"));//so in form it take only get and post req but we want to patch req so we used method override

//
app.use(express.urlencoded({extended:true}));//Purpose: To parse incoming request data encoded as application/x-www-form-urlencoded (form data).
// Why:
// This middleware is commonly used when handling data submitted via HTML forms.
// It converts the data into a JavaScript object (accessible via req.body) for easier processing in the server.
app.set("view engine ","ejs");
// Configures the template/view engine for the application to EJS (Embedded JavaScript).
// Why:
// View engines like EJS help render dynamic HTML pages.
app.set("views",path.join(__dirname,"views"));
// Specifies the directory where the template/view files are located.
// Why:
// By default, Express looks for views in a folder named views in the root directory.
// If your views folder is elsewhere or want to customize the path, you set it using path.join(__dirname, "views").
app.use(express.static(path.join(__dirname, "public")));

//Serves static files (e.g., CSS, JS, images) from the public directory

app.get("/",(req,res)=>{
    //res.send("server is working well");
    res.render("index.ejs",{posts});
})

//lets create post data

let posts=[
    {
        id:uuidv4(),
        username:"Devansh Jain",
        content:"I am Pursuing my Masters in Computer Application , currently developing skills in learning the mern stack"
    }, {
        id:uuidv4(),
        username:"Quora Project ",
        content:"It is developed because to learn backend of the website and try to practice it , it is build using node and express "
    }, {
        id:uuidv4(),
        username:"Features",
        content:"This project is a Quora-like platform with full CRUD functionality, allowing users to create, view, edit, and delete posts dynamically. It features a user-friendly interface with a responsive glassmorphic dark theme and secure backend integration using RESTful routes and EJS templates. Navigation links and mobile-friendly design ensure seamless usability. The project is scalable for future enhancements like user authentication, post categorization, and commenting."
    },
];
// app.get("/posts",(req,res)=>{
//     res.render("index.ejs",{posts});
// })
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
     
})
app.post("/posts/new",(req,res)=>{
    console.log(req.body);
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
    res.redirect("/"); 
    console.log(posts);

});
//now we are creating route for the view by id first we have to create by id
app.get("/posts/:id", (req, res) => {
    console.log("getting the get request")
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    if (post) {
        res.render("show.ejs", { post });
    } else {
        res.status(404).send("Post not found");
    }
});

//now we creating the update route and also edit route lets go

app.patch("/posts/:id",(req,res)=>{//this will work with hoppscotch s
    let {id}=req.params;
    let newContent=req.body.content; 
    console.log(id);
    console.log(newContent)
    let post=posts.find((p)=>p.id===id);
    post.content =newContent;

   
    // res.send("patch req is working")
    res.redirect("/");
})
app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post})
})
//now we are creating destroy route
app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=>id!==p.id);
    res.redirect("/")
})
app.listen(port,()=>{
console.log("listening to the port ");
});