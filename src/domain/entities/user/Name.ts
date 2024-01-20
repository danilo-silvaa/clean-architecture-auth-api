import { z } from 'zod';
import { Either, left, right } from '../../shared/Either';
import { InvalidNameError } from '../../errors/user/InvalidNameError';
import { IError } from '../../errors/IError';

export class Name {
    static create (name: string): Either<IError, string> {
        const nameValidation = z.string().trim().min(1).max(255).safeParse(name);
        if (!nameValidation.success) return left(InvalidNameError);

        return right(nameValidation.data);
    }
}