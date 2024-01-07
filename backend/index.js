const User = require('./models/User')
const UserCounter = require('./models/UserCounter')
const express = require('express');
const app = express();
const port = 5000;
const mongoDB = require('./db')

mongoDB();
app.use((req, res, next)=>{
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})

app.use(express.json());
//as we have to make multiple use for login signup and many more
app.use('/api', require('./Routes/UserManagement'));

app.post("/createuser", 

  async (req, res) => {                         //endpoint
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }

      //bcrypt is a hashing algorithm
      const salt = await bcrypt.genSalt(10);                  //random value which is combined with the password before password is hashed
      let securePassword = await bcrypt.hash(req.body.password, salt)

      const { curr_id } = await UserCounter.findOne({ counter: "id" });
      const user_id = curr_id;

      const alreadyUser = await User.findOne({email:email});
      if(alreadyUser){
          res.json("Email Already Registered");
      }
      
      try {
          await User.create({
              user_id: user_id,
              user_name: req.body.user_name,
              email: req.body.email,
              password: securePassword,
              user_type: req.body.user_type
          })
          res.json({ success: true });
      } catch (error) {
          console.log(error);
          res.json({ success: false });
      }

      const usercounter = await UserCounter.findOneAndUpdate({counter:"id"},{"$inc":{"curr_id":1}});
  })
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// (req, res) => { [

//   //validation
//   body("email", "Incorrect Email").isEmail(),
//   //password must be at least 5 length
//   body("password", "Incorrect Password").isLength({ min: 5 })],