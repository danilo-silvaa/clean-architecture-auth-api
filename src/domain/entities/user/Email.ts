import { z } from 'zod';
import { Either, left, right } from '../../shared/Either';
import { InvalidEmailError } from '../../errors/user/InvalidEmailError';
import { IError } from '../../errors/IError';

export class Email {
    static create (email: string): Either<IError, string> {
        const emailValidation = z.string().trim().email().max(255).safeParse(email);
        if (!emailValidation.success) return left(InvalidEmailError);

        return right(emailValidation.data);
    }
}