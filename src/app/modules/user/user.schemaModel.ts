import { Schema, model } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';

const userSchema = new Schema<TUser, UserModel>(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      validate: {
        validator: function (value: string) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(value);
        },
        message: 'Invalid email format',
      },
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
      },
    },
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// userSchema.statics.isUserExistsByUserName = async (username: string) => {
//   return await User.findOne({ username }).select(
//     '+password +previousPasswords',
//   );
// };

userSchema.statics.isPasswordMatched = async (
  plainPass: string,
  hashedPass: string,
) => {
  return await bcrypt.compare(plainPass, hashedPass);
};

export const User = model<TUser, UserModel>('User', userSchema);
