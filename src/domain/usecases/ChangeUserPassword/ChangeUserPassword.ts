import { randomUUID } from 'crypto';
import { CurrentPasswordIncorrectError } from '../../errors/user/CurrentPasswordIncorrectError';
import { MissingRequiredParametersError } from '../../errors/user/MissingRequiredParametersError';
import { UserRepository } from '../../repositories/UserRepository';
import { PasswordHash } from '../../services/PasswordHash';
import { left, right } from '../../shared/Either';
import { ChangeUserPasswordData, ChangeUserPasswordResponse, IChangeUserPassword } from './IChangeUserPassword';
import { PasswordsAreSameError } from '../../errors/user/PasswordsAreSameError';

export class ChangeUserPassword implements IChangeUserPassword {
    constructor (
        private userRepository: UserRepository,
        private passwordHash: PasswordHash,
    ) {}

    async execute (data: ChangeUserPasswordData): ChangeUserPasswordResponse {
        if (this.hasMissingRequiredParameters(data)) return left(MissingRequiredParametersError);

        if (this.checkNewPasswordIsSameCurrent(data)) return left(PasswordsAreSameError);

        const isCurrentPasswordValid = await this.passwordHash.compare(data.currentPassword, data.user.password);
        if (!isCurrentPasswordValid) return left(CurrentPasswordIncorrectError);

        const newPassword = await this.passwordHash.hash(data.newPassword);
        await this.userRepository.updatePassword(data.user.id, newPassword);
        
        const newTokenSigningKey = randomUUID();
        await this.userRepository.updateTokenSigningKey(data.user.id, newTokenSigningKey);

        return right(null);
    }

    private hasMissingRequiredParameters (data: ChangeUserPasswordData): boolean {
        return !data || !data.currentPassword || !data.newPassword || !data.user;
    }

    private checkNewPasswordIsSameCurrent (data: ChangeUserPasswordData): boolean {
        return data.currentPassword === data.newPassword;
    }
}