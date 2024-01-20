import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
    PORT: z.string().default('3333').transform(Number),
    JWT_SIGNATURE_KEY: z.string().trim().min(1),
});

type EnvProps = z.infer<typeof envSchema>

let validatedEnv: EnvProps | null;

export const makeEnvironmentValidation = (): EnvProps => {
    if (!validatedEnv) {
        const parsed = envSchema.safeParse(process.env);

        if (!parsed.success) {
            console.error('Environment validation failed');
            process.exit(1)
        }

        validatedEnv = parsed.data;
    }

    return validatedEnv;
};