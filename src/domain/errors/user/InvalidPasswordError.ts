import { IError } from '../IError';

export const InvalidPasswordError: IError = {
    type: 'INVALID_PASSWORD',
    message: 'Password must be at least 8 characters long.',
    statusCode: 400,
}