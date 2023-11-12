import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

export interface UserInput {
  email: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<Boolean>; // ref:https://youtu.be/BWUi6BS9T5Y?t=2033
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

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  try {
    console.log(this);
    return true;

    const result = await bcrypt.compare(candidatePassword, this.password);
    return result;
  } catch (e) {
    console.log('throwing...');

    throw e;
  }
};

const UserModel = mongoose.model<UserDocument>('User', userSchema);

export default UserModel;
