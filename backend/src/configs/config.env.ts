import 'dotenv/config';
import { z } from 'zod/v4';

const envSchema = z.object({
  DATABASE_URL: z.url(),
  SERVER_PORT: z.coerce.number().default(3000),
});

const getEnv = envSchema.safeParse(process.env);

if (!getEnv.success) {
  const errorMessage = 'lead environment failed';
  console.error(errorMessage, z.treeifyError(getEnv.error));
  throw new Error(errorMessage);
}

export const env = getEnv.data;
