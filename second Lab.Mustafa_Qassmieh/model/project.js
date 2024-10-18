const mongoose = require("mongoose");


const usersSchema = new mongoose.Schema({ //check schema

    employeeID:{
      type: String,  
      required: true,
      unique: true
    }, 
    employeeName:{
        type: String,  
        required: true,
        
    }, 
    employeeEmail:{
        type: String,  
        required: true,
    }, 
    password:{
        type: String,  
        required: true,
        
    } 
    
});

const users = mongoose.model("employee", usersSchema);

async function addEmployee(employeeName, email, password, employeeID) {
  try {
    const userExist = await users.findOne({ employeeID });
    if (userExist) {
      return null;
    }
    const newUser = new users({
      userName: userName,
      email: email,
      password: hashedPassword,
    });
    await newUser.save();
    return newUser;
  } catch (error) {
      throw error; // handle the error in the route
  }
}

async function getEmployee(email, password) {
  try {
    const user = await users.findOne({ email: email });
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }
  catch (error) {
    throw error; // handle the error in the route
  }
}

module.exports = { //prepare which functions I want this class to export
  authenticateUser, 
  addUser
};
/*Project Collection:
This table shall have the following attributes:
• project_code, (should be unique)
• project_name
• project_ description*/