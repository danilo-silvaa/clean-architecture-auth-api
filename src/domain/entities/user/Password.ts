import { z } from 'zod';
import { Either, left, right } from '../../shared/Either';
import { InvalidPasswordError } from '../../errors/user/InvalidPasswordError';
import { IError } from '../../errors/IError';

export class Password {
    static create (password: string): Either<IError, string> {
        const passwordValidation = z.string().trim().min(8).max(255).safeParse(password);
        if (!passwordValidation.success) return left(InvalidPasswordError);

        return right(passwordValidation.data);
    }
}