const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

// Create a Schema (structure)
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter an email"], // Mongoose Validation
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter an password"], // Mongoose Validation
    minlength: [8, "Minimum Password length is 8 characters"],
  },
});

// Fire a function after doc saved to db
/*
userSchema.post("save", (doc, next) => {
  console.log("========>  ", doc);
  next();
});
*/
// Fire a function before doc saved to db
userSchema.pre("save", async function (next) {
  //console.log("This ", this);
  const salt = await bcrypt.genSalt(); // Generating salt
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Static method to login user
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) return user;
    throw Error("Invalid Password");
  }
  throw new Error("Invalid email");
};

const User = mongoose.model("user", userSchema);

module.exports = User;
