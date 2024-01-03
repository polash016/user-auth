import { z } from 'zod';

const registerUserValidationSchema = z.object({
  body: z.object({
    username: z.string({ required_error: 'Username is required' }),
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Invalid email format' }),
    password: z
      .string({ required_error: 'Password is required' })
      .max(20, { message: 'Password can not be more than 20 characters' }),
    role: z.enum(['user', 'admin']).default('user'),
    isDeleted: z.boolean().default(false),
  }),
});

export const UserValidations = {
  registerUserValidationSchema,
};
