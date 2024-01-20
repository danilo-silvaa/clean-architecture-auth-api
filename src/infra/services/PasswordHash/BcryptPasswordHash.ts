import { PasswordHash } from '../../../domain/services/PasswordHash';
import bcrypt from 'bcrypt';

export class BcryptPasswordHash implements PasswordHash {
    private saltRounds = 8;
    
    async hash (plainTextPassword: string): Promise<string> {
        return await bcrypt.hash(plainTextPassword, this.saltRounds)
    }

    async compare (plainTextPassword: string, passwordHash: string): Promise<boolean> {
        return await bcrypt.compare(plainTextPassword, passwordHash);
    }
}