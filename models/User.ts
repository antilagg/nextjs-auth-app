import mongoose from 'mongoose';

export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const userschema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, 'plz enter username'],
      unique: true,
      trim: true,
      minlength: [3, 'username must be at least 3 characters']
    },
    email: {
      type: String,
      required: [true, 'plz enter email'],
      unique: true,
      match: [
        /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        'plss enter a valid email'
      ]
    },
    password: {
      type: String,
      required: [true, 'plz enter password'],
      minlength: [6, 'password must be at least 6 characters']
    }
  },
  {
    timestamps: true
  }
);


// OverwriteModelError during hotreloading
export default mongoose.models.User || mongoose.model<IUser>('User', userschema);
