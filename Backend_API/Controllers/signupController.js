const prisma=require('../prisma');
const {body,validationResult}=require("express-validator");
const bcrypt=require("bcryptjs");

function signupGet(req,res){
    res.render("signup");
}

const signupPost=[
    body("username").isLength({min:4}).withMessage("Username must be at least 4 characters"),
    body("password").matches(/[A-Z]/).withMessage("password must contain at least one capital letter")
    .matches(/[a-z]/).withMessage("password must contain at least one lower letter")
    .matches(/\d/).withMessage("password must contain at least one number"),
    async (req,res) => {
        console.log("entered post");
        let errors=validationResult(req);
        let errorsArr=errors.array().map(e => e.msg);
        if(errorsArr.length>0){
            res.redirect("/error");
            return;
        }
        let signed=await prisma.users.create({
            data : {
                username:req.body.username,
                first_name:req.body.first,
                last_name:req.body.last,
                password:await bcrypt.hash(req.body.password,10),
            }
        })
        res.status(200).send("ok");
        console.log(signed);
        console.log(req.body);
    }
]

module.exports={
    signupGet,
    signupPost,
}