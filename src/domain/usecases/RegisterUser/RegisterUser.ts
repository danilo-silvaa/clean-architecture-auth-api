import { User } from '../../entities/user/User';
import { EmailExistsError } from '../../errors/user/EmailExistsError';
import { MissingRequiredParametersError } from '../../errors/user/MissingRequiredParametersError';
import { UserRepository } from '../../repositories/UserRepository';
import { PasswordHash } from '../../services/PasswordHash';
import { TokenManager } from '../../services/TokenManager';
import { left, right } from '../../shared/Either';
import { IRegisterUser, RegisterUserData, RegisterUserResponse } from './IRegisterUser';

export class RegisterUser implements IRegisterUser {
    constructor (
        private userRepository: UserRepository,
        private passwordHash: PasswordHash,
        private tokenManager: TokenManager
    ) {}

    async execute (data: RegisterUserData): RegisterUserResponse {
        if (!data) return left(MissingRequiredParametersError);

        const userOrError = User.create(data);
        if (userOrError.isLeft()) return left(userOrError.value);
        
        const user = userOrError.value;

        const exists = await this.userRepository.exists(user.email);
        if (exists) return left(EmailExistsError);

        user.password = await this.passwordHash.hash(user.password);

        await this.userRepository.add(user);

        const accessToken = this.tokenManager.sign(user.id, user.tokenSigningKey);

        return right(accessToken);
    }
}