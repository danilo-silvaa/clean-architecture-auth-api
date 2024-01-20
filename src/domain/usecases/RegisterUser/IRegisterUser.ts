import { UserProps } from '../../entities/user/User';
import { IError } from '../../errors/IError';
import { Either } from '../../shared/Either';

export type RegisterUserData = Omit<UserProps, 'id' | 'tokenSigningKey' | 'createdAt'>;

export interface IRegisterUser {
    execute (data: RegisterUserData): RegisterUserResponse;
}

export type RegisterUserResponse = Promise<Either<IError, string>>