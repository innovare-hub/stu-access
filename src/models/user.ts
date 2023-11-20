import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

export interface UserInput {
  email: string;
  password: string;
}

export interface UserDocument extends UserInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);

  const hash = bcrypt.hashSync(this.password, salt);

  this.password = hash;

  return next();
});

const UserModel = mongoose.model<UserDocument>('User', userSchema);

export default UserModel;
