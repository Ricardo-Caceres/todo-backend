import mongoose from "mongoose";
// hash password with bcrypt:
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    token: {
      type: String,
    },
    confirm: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      required: false,
      trim: true,
      minlength: 3,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// hash password with bcrypt:
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// check if the password is correct:
userSchema.methods.checkPassword = async function (password) {
  const user = this;
  return await bcrypt.compare(password, user.password);
};

const UserModel = mongoose.model("UserModel", userSchema);

export default UserModel;
