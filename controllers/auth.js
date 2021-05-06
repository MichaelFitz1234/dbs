const mysql = require("mysql2");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_Password,
    database: process.env.DATABASE
  })
exports.login = async(req,res) => {
    try {
        const {email, password} = req.body
        if(!email || !password){
        return res.status(400).render('login',{
            message: "Please Provide Email and Password"
        })
        }
    db.query("SELECT * FROM users WHERE email = ?", [email], async(error, result) =>{
        if(!result|| !(await password !== results[0].password)){
        res.status(401).render('login',{
            message: "email or password incorrect"
        })
        }

    }) 
    } catch (error) {
      console.log(error)  
    }
}


exports.register = (req, res) => {
console.log(req.body);
const name = req.body.name
const email = req.body.email
const password = req.body.password
const confirmpassword = req.body.confirmpassword
db.query('SELECT email FROM users WHERE email = ?', [email],async (error, result)=>{
    if(error){
        console.log(error)
    }
    if(result.length > 0){
        return res.render('register',{
            message: 'email already in use'
        })
    }
    let hashedPassword = await bcrypt.hash(password, 8);
    db.query('INSERT INTO users SET ?', {name: name, email: email, password: hashedPassword, id: 2},(error, result)=>{
    if (error){
        console.log(error);
    }else{
        return res.render('register', {
            message: 'User Registered'
        })
    }
    })
});

}