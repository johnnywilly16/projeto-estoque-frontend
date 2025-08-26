import { z } from 'zod/v4';
import { CreateUserDtoSchema } from './create-user.dto';

export const UpdateUserDtoSchema = CreateUserDtoSchema.partial();

export type UpdateUserDto = z.infer<typeof UpdateUserDtoSchema>;
