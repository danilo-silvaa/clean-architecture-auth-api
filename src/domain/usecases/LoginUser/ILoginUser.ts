import { UserProps } from '../../entities/user/User';
import { IError } from '../../errors/IError';
import { Either } from '../../shared/Either';

export type LoginUserData = Pick<UserProps, 'email' | 'password'>;

export interface ILoginUser {
    execute (data: LoginUserData): LoginUserResponse;
}

export type LoginUserResponse = Promise<Either<IError, string>>