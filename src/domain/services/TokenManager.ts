import { Either } from '../shared/Either';
import { IError } from '../errors/IError';
import { User } from '../entities/user/User';

export interface TokenManager {
    sign (id: string, uniqueSigningKey: string): string;
    verify (token: string): Promise<Either<IError, User>>;
}