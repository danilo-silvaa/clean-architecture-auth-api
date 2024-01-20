import { User } from '../../entities/user/User';
import { IError } from '../../errors/IError';
import { Either } from '../../shared/Either';

export type ChangeUserPasswordData = {
    currentPassword: string;
    newPassword: string;
    user: User;
}

export interface IChangeUserPassword {
    execute (data: ChangeUserPasswordData): ChangeUserPasswordResponse;
}

export type ChangeUserPasswordResponse = Promise<Either<IError, null>>