import { IError } from '../IError';

export const InvalidEmailOrPasswordError: IError = {
    type: 'INVALID_EMAIL_OR_PASSWORD',
    message: 'Invalid email or password.',
    statusCode: 401,
}