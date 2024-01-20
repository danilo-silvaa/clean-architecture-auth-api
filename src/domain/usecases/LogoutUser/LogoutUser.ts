import { randomUUID } from 'crypto';
import { MissingRequiredParametersError } from '../../errors/user/MissingRequiredParametersError';
import { UserRepository } from '../../repositories/UserRepository';
import { left, right } from '../../shared/Either';
import { ILogoutUser, LogoutUserResponse } from './ILogoutUser';
import { User } from '../../entities/user/User';

export class LogoutUser implements ILogoutUser {
    constructor (private userRepository: UserRepository) {}

    async execute (user: User): LogoutUserResponse {
        if (!user) return left(MissingRequiredParametersError);

        const newTokenSigningKey = randomUUID();
        await this.userRepository.updateTokenSigningKey(user.id, newTokenSigningKey);

        return right(null);
    }
}