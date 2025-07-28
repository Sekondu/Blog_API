const express=require("express");
const localStrategy=require("passport-local").Strategy;
const passport=require("passport");
const prisma=require("./prisma");
const bcrypt=require("bcryptjs");
const signupController=require("./Controllers/signupController");
const jwt=require("jsonwebtoken");
const path=require("path");
const cors=require("cors");
const multer=require("multer");

const app=express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.use("/Controllers",express.static(path.join(__dirname,'Controllers')));

function authenticateToken(req,res,next){
    const authheader=req.headers["authorization"];
    const token=authheader && authheader.split(' ')[1];

    if(!token) {return res.status(401).json({message : "No token found Access Denied"})}

    jwt.verify(token,"A secret",(err,user) => {
        if(err) {return res.status(403).json({message:'Invalid Token'})}
        req.user=user;
        next();
    })
}

const storage=multer.diskStorage({
    destination:function(req,file,cb) {
        cb(null,'uploads/');
    },
    filename:function (req,file,cb) {
        cb(null,Date.now() + '-' + file.originalname);
    }
})

const upload=multer({storage});

app.put("/article",authenticateToken,upload.single("img"),async (req,res) => {
    let data=req.body;
const response=await prisma.articles.update({
    where : {id : Number(req.query.id)},
    data : {
        title : data.title,
        content: data.content,
        cover_page: req.file ? req.file.path : undefined,
        published: data.published=="false" ? false : true,
    }
})
res.json(response);
})

passport.use(new localStrategy(async (username,password,done) => {
let user=await prisma.users.findUnique({
where : {
    username:username,
}
})
    if(!user)
    {
        return done(null,false);
    }
    if(!(await bcrypt.compare(password,user.password))){
        return done(null,false);
    }
    return done(null,user);
}))
app.post("/Articles",authenticateToken,async (req,res) => {
    let Articles=await prisma.articles.findMany({
        where : {published:true},
        include : {comments : {
            include : {
                author : {
                    select : {
                        username : true,
                    }
                }
            }
        }}
    });
    console.log(Articles);
    res.json({Articles});
});

app.post("/AdminArticles",authenticateToken,async (req,res) => {
    let Articles=await prisma.articles.findMany({
        include : {comments : {
            include : {
                author : {
                    select : {
                        username : true,
                    }
                }
            }
        }}
    });
    res.json({Articles});
})

app.get("/article",authenticateToken,async (req,res) => {
    let id=req.query.id;
    let article=await prisma.articles.findUnique({
        where : {id:Number(id)},
        include: {comments:{
            include :
            {
                author :{
                    select : {
                        username :true,
                    }
                }
            }
            }
        },
    })

    res.json({article});
})
app.post("/AddArticle",authenticateToken,upload.single("img"),async (req,res) => {
    let response=await prisma.articles.create({
        data : {
            title:req.body.title,
            content:req.body.content,
            published:req.body.published=="false" ? false : true,
            cover_page: req.file ? req.file.path : undefined,
        }
    })
    res.status(201).json({response});
})

app.post("/AddComment",authenticateToken,async (req,res) => {
    const userId=req.user.id;
    try{await prisma.articles.update({
        where : {id : Number(req.query.id)},
        data : {
        comments : {
            create : {
                title : req.body.title,
                content : req.body.content,
                author : {
                    connect : {id : Number(userId)}
                }
            }
        }}
    })
    res.status(201).json(req.user.username);
    }
    catch(err){
        console.log(err);
    }
    
})

app.get("/signup",signupController.signupGet);
app.post("/signup",signupController.signupPost);

app.post("/login",(req,res,next)=> {
    passport.authenticate('local',{session:false},(err,user,info) => {
        if(err || !user) {return res.status(401).json({message:"login failed"})}
            const token=jwt.sign({id:user.id,username:user.username,role:user.role},'A secret',{expiresIn:"1h"});
        res.json({token:token});
    })(req,res,next);
})
app.post("/Adminlogin",(req,res,next) => {
    passport.authenticate('local',{session:false},(err,user,info) => {
        if(err || !user) {return res.status(401).json({message:"failed to login admin"})}
        const token=jwt.sign({id:user.id,username:user.username,role:user.role},'A secret',{expiresIn:"1h"});
        if(user.role!=="admin") {return res.status(403).json({msg:"not an admin!"})}
        res.json({token:token});
    })(req,res,next);
})

app.post("/delete" ,async (req,res) => {
    let id=req.query.id;
    let response=await prisma.articles.delete({
        where : {id : Number(id)},
    })
    res.json({response});
})

app.listen(3000);