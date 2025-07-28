const prisma=require("../prisma");
const path=require("path");
const img_path=path.join(__dirname,"AI.jpg");
const bcrypt=require("bcryptjs");
async function create(){
    let pass=await bcrypt.hash("RwidAdmin123456",10)
await prisma.users.create({
    data : {
    username:"admin",
    password:pass,
    role:"admin",
    }
})

}
create();