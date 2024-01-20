import { IError } from '../IError';

export const InvalidEmailError: IError = {
    type: 'INVALID_EMAIL',
    message: 'Invalid email.',
    statusCode: 400,
}