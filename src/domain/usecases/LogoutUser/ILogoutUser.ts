import { User } from '../../entities/user/User';
import { IError } from '../../errors/IError';
import { Either } from '../../shared/Either';

export interface ILogoutUser {
    execute (user: User): LogoutUserResponse;
}

export type LogoutUserResponse = Promise<Either<IError, null>>