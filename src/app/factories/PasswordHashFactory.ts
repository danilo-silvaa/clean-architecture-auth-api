import { PasswordHash } from '../../domain/services/PasswordHash';
import { BcryptPasswordHash } from '../../infra/services/PasswordHash/BcryptPasswordHash';

let passwordHashInstance: PasswordHash | null;

export const makePasswordHash = (): PasswordHash => {
    if (!passwordHashInstance) {
        passwordHashInstance = new BcryptPasswordHash();
    }
    return passwordHashInstance;
};