import { Email } from '../../entities/user/Email';
import { Password } from '../../entities/user/Password';
import { IError } from '../../errors/IError';
import { InvalidEmailOrPasswordError } from '../../errors/user/InvalidEmailOrPasswordError';
import { MissingRequiredParametersError } from '../../errors/user/MissingRequiredParametersError';
import { UserRepository } from '../../repositories/UserRepository';
import { PasswordHash } from '../../services/PasswordHash';
import { TokenManager } from '../../services/TokenManager';
import { Either, left, right } from '../../shared/Either';
import { ILoginUser, LoginUserData, LoginUserResponse } from './ILoginUser';

export class LoginUser implements ILoginUser {
    constructor (
        private userRepository: UserRepository,
        private passwordHash: PasswordHash,
        private tokenManager: TokenManager
    ) {}

    async execute (data: LoginUserData): LoginUserResponse {
        if (this.hasMissingRequiredParameters(data)) return left(MissingRequiredParametersError);

        const validateEmailAndPassword = this.validateEmailAndPassword(data.email, data.password);
        if (validateEmailAndPassword.isLeft()) return left(validateEmailAndPassword.value);

        const { email, password } = validateEmailAndPassword.value;

        const userOrNull = await this.userRepository.findByEmail(email);
        if (!userOrNull) return left(InvalidEmailOrPasswordError);

        const isPasswordValid = await this.passwordHash.compare(password, userOrNull.password);
        if (!isPasswordValid) return left(InvalidEmailOrPasswordError);

        const accessToken = this.tokenManager.sign(userOrNull.id, userOrNull.tokenSigningKey);

        return right(accessToken);
    }

    private validateEmailAndPassword (email: string, password: string): Either<IError, {email: string, password: string}> {
        const emailOrError = Email.create(email);
        if (emailOrError.isLeft()) return left(emailOrError.value);

        const passwordOrError = Password.create(password);
        if (passwordOrError.isLeft()) return left(passwordOrError.value);

        return right({ email: emailOrError.value, password: passwordOrError.value });
    }

    private hasMissingRequiredParameters (data: LoginUserData): boolean {
        return !data || !data.email || !data.password;
    }
}