/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export interface TUser {
  username: string;
  email: string;
  password: string;
  isDeleted: boolean;
}

export interface UserModel extends Model<TUser> {
  isPasswordMatched(plainPass: string, hashedPass: string): Promise<boolean>;
}
