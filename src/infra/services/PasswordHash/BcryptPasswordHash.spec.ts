import { describe, expect, it } from 'vitest';
import { BcryptPasswordHash } from './BcryptPasswordHash';

describe('Bcrypt Password Hash', () => {
    const bcryptPasswordHash = new BcryptPasswordHash();
    const plainTextPassword  = 'StrongPassword123';

    it('should generate a hash for the password', async () => {
        const hashedPassword  = await bcryptPasswordHash.hash(plainTextPassword);
        
        expect(hashedPassword).toBeDefined();
        expect(hashedPassword).not.toEqual(plainTextPassword);
    });

    it('should correctly compare a password with its corresponding hash', async () => {
        const hashedPassword = await bcryptPasswordHash.hash(plainTextPassword);

        const isMatch = await bcryptPasswordHash.compare(plainTextPassword, hashedPassword);
        expect(isMatch).toBeTruthy();

        const isNotMatch = await bcryptPasswordHash.compare('wrongPassword', hashedPassword);
        expect(isNotMatch).toBeFalsy();
    });
});